'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

// Color Palette Locked to XOLUM Brand
const PALETTE = {
  emerald: '#10b981',
  emeraldRgb: [0.0627, 0.7255, 0.5059] as [number, number, number],
  cyan: '#22d3ee',
  cyanRgb: [0.1333, 0.8275, 0.9333] as [number, number, number],
  bg: '#06090e',
};

// Procedural Terrain Height Calculation
function getTerrainHeight(x: number, z: number): number {
  return Math.sin(x * 0.35) * Math.cos(z * 0.35) * 0.45 + Math.sin((x + z) * 0.22) * 0.3;
}

// 7 Security Nodes on Terrain Grid
interface DetectionNode {
  id: number;
  x: number;
  z: number;
  y: number;
  label: string;
  category: string;
  confidence: string;
}

const NODES_DATA: Omit<DetectionNode, 'y'>[] = [
  { id: 1, x: -4.5, z: -2.8, label: 'PERSONA', category: 'PERIMETER_01', confidence: '98.7%' },
  { id: 2, x: 3.8, z: -4.5, label: 'VEHÍCULO', category: 'VEHICLE_TRACK', confidence: '99.4%' },
  { id: 3, x: 5.2, z: 3.2, label: 'PERSONA', category: 'ZONE_B_ENTRY', confidence: '97.2%' },
  { id: 4, x: -3.6, z: 4.8, label: 'VEHÍCULO', category: 'PARKING_LOT_3', confidence: '96.8%' },
  { id: 5, x: 1.2, z: -1.6, label: 'ANOMALÍA', category: 'MOTION_SENS_04', confidence: '99.9%' },
  { id: 6, x: -6.2, z: 1.8, label: 'DRONE', category: 'AIR_ZONE_A', confidence: '95.1%' },
  { id: 7, x: 6.5, z: -1.2, label: 'CAM_NODE', category: 'SYSTEM_HUB', confidence: '100%' },
];

const NODES: DetectionNode[] = NODES_DATA.map((n) => ({
  ...n,
  y: getTerrainHeight(n.x, n.z),
}));

// --- 0. Control Activo del Tamaño del Canvas ---
function CanvasResizeHandler() {
  const { gl, camera, invalidate } = useThree();

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();

    const checkSize = () => {
      const parent = gl.domElement.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;

        if (width > 0 && height > 0) {
          if (camera instanceof THREE.PerspectiveCamera) {
            const aspect = width / height;
            if (Math.abs(camera.aspect - aspect) > 0.001) {
              camera.aspect = aspect;
              camera.updateProjectionMatrix();
              invalidate();
            }
          }
        }
      }

      if (performance.now() - startTime < 2500) {
        animId = requestAnimationFrame(checkSize);
      }
    };

    checkSize();

    const ro = new ResizeObserver(() => {
      checkSize();
    });

    if (gl.domElement.parentElement) {
      ro.observe(gl.domElement.parentElement);
    }

    window.addEventListener('resize', checkSize);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('resize', checkSize);
    };
  }, [gl, camera, invalidate]);

  return null;
}

// --- 1. Procedural 3D Terrain Grid Component (Malla 70x70) ---
function TerrainGrid({
  accumTimeRef,
  isReducedMotion,
}: {
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const baseMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const gridMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ringsMatRef = useRef<THREE.LineBasicMaterial>(null!);

  const { geometry, ringsGeometry } = useMemo(() => {
    const width = 70;
    const height = 70;
    const segments = 90;

    const planeGeo = new THREE.PlaneGeometry(width, height, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getTerrainHeight(x, z));
    }
    planeGeo.computeVertexNormals();

    const ringsGroupGeo = new THREE.BufferGeometry();
    const ringVerts: number[] = [];
    const ringRadii = [3.0, 6.0, 9.5, 13.0, 17.0, 22.0];
    const ringSegments = 96;

    ringRadii.forEach((r) => {
      for (let i = 0; i < ringSegments; i++) {
        const theta1 = (i / ringSegments) * Math.PI * 2;
        const theta2 = ((i + 1) / ringSegments) * Math.PI * 2;
        const x1 = Math.cos(theta1) * r;
        const z1 = Math.sin(theta1) * r;
        const x2 = Math.cos(theta2) * r;
        const z2 = Math.sin(theta2) * r;
        const y1 = getTerrainHeight(x1, z1) + 0.04;
        const y2 = getTerrainHeight(x2, z2) + 0.04;
        ringVerts.push(x1, y1, z1, x2, y2, z2);
      }
    });

    ringsGroupGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringVerts, 3));

    return { geometry: planeGeo, ringsGeometry: ringsGroupGeo };
  }, []);

  useFrame(() => {
    if (isReducedMotion) {
      if (baseMatRef.current) baseMatRef.current.opacity = 0.7;
      if (gridMatRef.current) gridMatRef.current.opacity = 0.22;
      if (ringsMatRef.current) ringsMatRef.current.opacity = 0.35;
      return;
    }

    const elapsed = accumTimeRef.current;

    const intro = Math.min(1.0, elapsed / 0.8);
    const boost = elapsed >= 4.8 ? Math.min(1.0, (elapsed - 4.8) / 1.0) : 0;
    const mix = (dim: number, full: number) => dim * intro + (full - dim) * boost;

    if (baseMatRef.current) baseMatRef.current.opacity = mix(0.55, 0.75);
    if (gridMatRef.current) gridMatRef.current.opacity = mix(0.19, 0.27);
    if (ringsMatRef.current) ringsMatRef.current.opacity = mix(0.26, 0.4);
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial ref={baseMatRef} color={PALETTE.bg} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={geometry}>
        <meshBasicMaterial
          ref={gridMatRef}
          color={PALETTE.emerald}
          wireframe
          transparent
          opacity={0}
          wireframeLinewidth={1}
        />
      </mesh>

      <lineSegments geometry={ringsGeometry}>
        <lineBasicMaterial ref={ringsMatRef} color={PALETTE.cyan} transparent opacity={0} linewidth={1} />
      </lineSegments>
    </group>
  );
}

// --- 2. PTZ Security Camera Component (Lente frontal nítido y limpio sin telarañas de alambre) ---
function PTZCameraAssembly({
  accumTimeRef,
  isReducedMotion,
}: {
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const mainGroupRef = useRef<THREE.Group>(null!);

  const mountGroupRef = useRef<THREE.Group>(null!);
  const mountMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const podGroupRef = useRef<THREE.Group>(null!);
  const podSolidMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const podEdgesMatRef = useRef<THREE.LineBasicMaterial>(null!);

  const lensGroupRef = useRef<THREE.Group>(null!);
  const bezelMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const apertureMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const glassMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const irisDotMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const irRingMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const ptzHeadRef = useRef<THREE.Group>(null!);

  const ledMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ledLightRef = useRef<THREE.PointLight>(null!);

  const visionConeMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const reticleGroupRef = useRef<THREE.Group>(null!);
  const reticleMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const reticleRingMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // Geometrías nítidas para Cámara PTZ Profesional
  const {
    mountGeo,
    podSolidGeo,
    podEdgesGeo,
    bezelGeo,
    apertureGeo,
    glassGeo,
    irisDotGeo,
    irRingGeo,
    ledGeo,
    coneGeo,
    reticleRingGeo,
    reticleCrossGeo,
  } = useMemo(() => {
    // 1) Brazo / Soporte Superior de Techo
    const cap = new THREE.CylinderGeometry(0.32, 0.40, 0.14, 24);
    cap.translate(0, 1.10, 0);

    const stem = new THREE.CylinderGeometry(0.11, 0.13, 0.65, 24);
    stem.translate(0, 0.70, 0);

    const ring = new THREE.TorusGeometry(0.38, 0.035, 16, 32);
    ring.rotateX(Math.PI / 2);
    ring.translate(0, 0.38, 0);

    const mountCombined = combineGeometries([cap, stem, ring]);

    // 2) Cuerpo Principal Cápsula PTZ (Sólido oscuro + Aristas nítidas con EdgesGeometry)
    const podCylinder = new THREE.CylinderGeometry(0.55, 0.55, 0.65, 32);
    podCylinder.rotateX(Math.PI / 2);

    const podDomeBack = new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    podDomeBack.rotateX(-Math.PI / 2);
    podDomeBack.translate(0, 0, -0.32);

    const podSolid = combineGeometries([podCylinder, podDomeBack]);
    const podEdges = new THREE.EdgesGeometry(podSolid, 25);

    // 3) UNIDAD LENTE ÓPTICA FRONTAL COMPLETAMENTE DESPEJADA (Z = +0.35 -> +0.45)
    // Bisel esmeralda exterior
    const bezel = new THREE.TorusGeometry(0.30, 0.04, 20, 40);
    bezel.translate(0, 0, 0.36);

    // Cono de apertura interior cian
    const aperture = new THREE.CylinderGeometry(0.26, 0.16, 0.12, 32, 1, true);
    aperture.rotateX(Math.PI / 2);
    aperture.translate(0, 0, 0.40);

    // Cristal óptico esférico cian
    const glass = new THREE.SphereGeometry(0.18, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
    glass.rotateX(Math.PI / 2);
    glass.translate(0, 0, 0.37);

    // Punto iris láser esmeralda
    const irisDot = new THREE.SphereGeometry(0.065, 16, 16);
    irisDot.translate(0, 0, 0.44);

    // 6 Leds Infrarrojos en anillo
    const irVerts: number[] = [];
    const irCount = 6;
    const irRadius = 0.24;
    for (let i = 0; i < irCount; i++) {
      const angle = (i / irCount) * Math.PI * 2;
      const x = Math.cos(angle) * irRadius;
      const y = Math.sin(angle) * irRadius;
      const tempSphere = new THREE.SphereGeometry(0.03, 12, 12);
      tempSphere.translate(x, y, 0.38);
      const posAttr = tempSphere.attributes.position;
      for (let j = 0; j < posAttr.count; j++) {
        irVerts.push(posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
      }
    }
    const irRing = new THREE.BufferGeometry();
    irRing.setAttribute('position', new THREE.Float32BufferAttribute(irVerts, 3));

    // LED de Estado Verde
    const led = new THREE.SphereGeometry(0.05, 12, 12);
    led.translate(0.22, 0.22, 0.39);

    // Cono de Visión
    const cone = new THREE.CylinderGeometry(0.08, 4.2, 5.8, 32, 1, true);
    cone.rotateX(-Math.PI / 2);
    cone.translate(0, 0, 3.3);

    // Retícula HUD
    const retRing = new THREE.RingGeometry(0.65, 0.75, 32);
    retRing.rotateX(-Math.PI / 2);
    retRing.translate(0, -2.8, 0);

    const crossVerts = [
      -0.85, -2.78, 0, -0.3, -2.78, 0,
       0.3, -2.78, 0,  0.85, -2.78, 0,
       0, -2.78, -0.85, 0, -2.78, -0.3,
       0, -2.78,  0.3, 0, -2.78,  0.85,
    ];
    const retCross = new THREE.BufferGeometry();
    retCross.setAttribute('position', new THREE.Float32BufferAttribute(crossVerts, 3));

    return {
      mountGeo: mountCombined,
      podSolidGeo: podSolid,
      podEdgesGeo: podEdges,
      bezelGeo: bezel,
      apertureGeo: aperture,
      glassGeo: glass,
      irisDotGeo: irisDot,
      irRingGeo: irRing,
      ledGeo: led,
      coneGeo: cone,
      reticleRingGeo: retRing,
      reticleCrossGeo: retCross,
    };
  }, []);

  function combineGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const verts: number[] = [];
    geos.forEach((g) => {
      const pos = g.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        verts.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      }
    });
    const combined = new THREE.BufferGeometry();
    combined.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return combined;
  }

  useFrame(() => {
    if (isReducedMotion) {
      if (mainGroupRef.current) mainGroupRef.current.visible = false;
      return;
    }

    const elapsed = accumTimeRef.current;

    if (elapsed > 6.0) {
      if (mainGroupRef.current) mainGroupRef.current.visible = false;
      return;
    }

    if (mainGroupRef.current) mainGroupRef.current.visible = true;

    const fadeOut = elapsed > 5.0 ? Math.max(0, 1.0 - (elapsed - 5.0) / 1.0) : 1.0;

    // FASE 1: Ensamblaje de la cámara en el centro (0.0s -> 2.2s)
    const pMount = Math.min(1.0, elapsed / 0.8);
    const easeMount = 1.0 - Math.pow(1.0 - pMount, 3);
    if (mountGroupRef.current) {
      mountGroupRef.current.position.y = 0.8 * (1.0 - easeMount);
    }
    if (mountMatRef.current) {
      mountMatRef.current.opacity = easeMount * 0.85 * fadeOut;
    }

    const pPod = Math.max(0, Math.min(1.0, (elapsed - 0.6) / 0.8));
    const easePod = 1.0 - Math.pow(1.0 - pPod, 3);
    if (podGroupRef.current) {
      podGroupRef.current.scale.setScalar(easePod);
    }
    if (podEdgesMatRef.current) {
      podEdgesMatRef.current.opacity = easePod * 0.75 * fadeOut;
    }
    if (podSolidMatRef.current) {
      podSolidMatRef.current.opacity = easePod * 0.92 * fadeOut;
    }

    const pLens = Math.max(0, Math.min(1.0, (elapsed - 1.2) / 0.8));
    const easeLens = 1.0 - Math.pow(1.0 - pLens, 3);
    if (lensGroupRef.current) {
      lensGroupRef.current.position.z = 0.6 * (1.0 - easeLens);
    }
    if (bezelMatRef.current) {
      bezelMatRef.current.opacity = easeLens * 0.95 * fadeOut;
    }
    if (apertureMatRef.current) {
      apertureMatRef.current.opacity = easeLens * 0.85 * fadeOut;
    }
    if (glassMatRef.current) {
      glassMatRef.current.opacity = easeLens * 0.95 * fadeOut;
    }
    if (irisDotMatRef.current) {
      irisDotMatRef.current.opacity = easeLens * 1.0 * fadeOut;
    }
    if (irRingMatRef.current) {
      irRingMatRef.current.opacity = easeLens * 0.85 * fadeOut;
    }

    const pLed = Math.max(0, Math.min(1.0, (elapsed - 2.0) / 0.5));
    if (ledMatRef.current) {
      ledMatRef.current.opacity = pLed * fadeOut;
    }
    if (ledLightRef.current) {
      const flash = elapsed >= 2.3 && elapsed <= 2.6 ? 4.5 : 2.2;
      ledLightRef.current.intensity = pLed * flash * fadeOut;
    }

    // FASE 2: Inclinación y Barrido PTZ (2.2s -> 2.5s -> 5.0s)
    let panAngle = 0;
    let tiltAngle = 0.18; // Leve inclinación estética para apreciar el frente 3D durante el ensamblaje

    if (elapsed >= 2.2 && elapsed < 2.5) {
      const tTilt = (elapsed - 2.2) / 0.3;
      tiltAngle = 0.18 + 0.32 * (1.0 - Math.cos(tTilt * Math.PI * 0.5));
    } else if (elapsed >= 2.5 && elapsed <= 5.0) {
      const ptzTime = (elapsed - 2.5) * 2.2;
      panAngle = Math.sin(ptzTime) * 0.62;
      tiltAngle = 0.50 + Math.cos(ptzTime * 0.8) * 0.08;
    }

    if (ptzHeadRef.current) {
      ptzHeadRef.current.rotation.y = panAngle;
      ptzHeadRef.current.rotation.x = tiltAngle;
    }

    let coneOpacity = 0;
    if (elapsed >= 2.5 && elapsed < 5.0) {
      coneOpacity = 0.38;
    } else if (elapsed >= 5.0 && elapsed < 5.5) {
      coneOpacity = 0.38 * (1.0 - (elapsed - 5.0) / 0.5);
    }

    if (visionConeMatRef.current) {
      visionConeMatRef.current.opacity = coneOpacity * fadeOut;
    }

    if (reticleGroupRef.current) {
      const retDist = 4.8;
      reticleGroupRef.current.position.x = Math.sin(panAngle) * retDist;
      reticleGroupRef.current.position.z = Math.cos(panAngle) * retDist;
      reticleGroupRef.current.rotation.y = panAngle;
    }
    if (reticleRingMatRef.current) {
      reticleRingMatRef.current.opacity = (coneOpacity > 0 ? 0.65 : 0) * fadeOut;
    }
    if (reticleMatRef.current) {
      reticleMatRef.current.opacity = (coneOpacity > 0 ? 0.85 : 0) * fadeOut;
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, 0.1, 0]}>
      {/* 1) Montura Superior */}
      <group ref={mountGroupRef}>
        <mesh geometry={mountGeo}>
          <meshBasicMaterial ref={mountMatRef} color={PALETTE.emerald} wireframe transparent opacity={0} />
        </mesh>
      </group>

      {/* 2) Cabeza PTZ Esférica Giratoria */}
      <group ref={ptzHeadRef}>
        <group ref={podGroupRef}>
          {/* Cuerpo sólido interior oscuro (bloquea partículas del fondo) */}
          <mesh geometry={podSolidGeo}>
            <meshBasicMaterial ref={podSolidMatRef} color={PALETTE.bg} transparent opacity={0} side={THREE.DoubleSide} />
          </mesh>
          {/* Aristas estructurales nítidas (sin rejilla de alambre) */}
          <lineSegments geometry={podEdgesGeo}>
            <lineBasicMaterial ref={podEdgesMatRef} color={PALETTE.emerald} transparent opacity={0} linewidth={1.5} />
          </lineSegments>
        </group>

        {/* 3) UNIDAD LENTE ÓPTICO COMPLETAMENTE FRONTAL Y CRISTALINA */}
        <group ref={lensGroupRef}>
          <mesh geometry={bezelGeo}>
            <meshBasicMaterial ref={bezelMatRef} color={PALETTE.emerald} transparent opacity={0} />
          </mesh>
          <mesh geometry={apertureGeo}>
            <meshBasicMaterial ref={apertureMatRef} color={PALETTE.cyan} wireframe transparent opacity={0} />
          </mesh>
          <mesh geometry={glassGeo}>
            <meshBasicMaterial ref={glassMatRef} color={PALETTE.cyan} transparent opacity={0} side={THREE.DoubleSide} />
          </mesh>
          <mesh geometry={irisDotGeo}>
            <meshBasicMaterial ref={irisDotMatRef} color={PALETTE.emerald} transparent opacity={0} />
          </mesh>
          <mesh geometry={irRingGeo}>
            <meshBasicMaterial ref={irRingMatRef} color={PALETTE.cyan} transparent opacity={0} />
          </mesh>

          <mesh geometry={ledGeo}>
            <meshBasicMaterial ref={ledMatRef} color={PALETTE.emerald} transparent opacity={0} />
          </mesh>
          <pointLight ref={ledLightRef} color={PALETTE.emerald} intensity={0} distance={4} />
        </group>

        {/* Cono de Visión */}
        <mesh geometry={coneGeo}>
          <meshBasicMaterial
            ref={visionConeMatRef}
            color={PALETTE.emerald}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 4) Retícula HUD */}
      <group ref={reticleGroupRef}>
        <mesh geometry={reticleRingGeo}>
          <meshBasicMaterial ref={reticleRingMatRef} color={PALETTE.emerald} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments geometry={reticleCrossGeo}>
          <lineBasicMaterial ref={reticleMatRef} color={PALETTE.cyan} transparent opacity={0} linewidth={1.5} />
        </lineSegments>
      </group>
    </group>
  );
}

// --- 3. Volumetric Radar Sweep Cone Sector ---
const VolumetricSweepShader = {
  uniforms: {
    uTime: { value: 0 },
    uSweepAngle: { value: 0 },
    uOpacity: { value: 0 },
    uColorBeam: { value: new THREE.Color(PALETTE.emerald) },
    uColorLead: { value: new THREE.Color(PALETTE.cyan) },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    uniform float uSweepAngle;
    uniform float uOpacity;
    uniform vec3 uColorBeam;
    uniform vec3 uColorLead;

    #define PI 3.14159265359

    void main() {
      if (uOpacity <= 0.001) discard;

      float dist = length(vWorldPosition.xz);
      if (dist > 18.0 || dist < 0.2) discard;

      float fragAngle = atan(vWorldPosition.z, vWorldPosition.x);
      if (fragAngle < 0.0) fragAngle += 2.0 * PI;

      float diff = uSweepAngle - fragAngle;
      if (diff < 0.0) diff += 2.0 * PI;

      float sectorWidth = 1.047;
      if (diff > sectorWidth) discard;

      float leadNormalized = 1.0 - (diff / sectorWidth);
      float beamIntensity = pow(leadNormalized, 2.8);
      float leadEdgeGlow = smoothstep(0.94, 1.0, leadNormalized) * 2.2;

      float heightFade = smoothstep(0.0, 0.3, vWorldPosition.y + 0.1) * (1.0 - smoothstep(1.8, 2.6, vWorldPosition.y));
      float distFade = 1.0 - smoothstep(14.0, 18.0, dist);

      float alpha = (beamIntensity * 0.38 + leadEdgeGlow * 0.85) * heightFade * distFade * uOpacity;

      vec3 color = mix(uColorBeam, uColorLead, leadEdgeGlow * 0.7);
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

function RadarSweep({
  sweepRef,
  accumTimeRef,
  isReducedMotion,
}: {
  sweepRef: React.MutableRefObject<number>;
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const leadLineRef = useRef<THREE.LineSegments>(null!);
  const leadMatRef = useRef<THREE.LineBasicMaterial>(null!);

  const sectorGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.1, 18.0, 2.4, 64, 1, true, 0, Math.PI * 2);
    geo.translate(0, 1.2, 0);
    return geo;
  }, []);

  const leadLineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [0, 0.05, 0, 18.0, 0.05, 0];
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const sweep = sweepRef.current;
    const elapsed = accumTimeRef.current;

    let sweepOpacity = 1.0;
    if (!isReducedMotion) {
      if (elapsed < 4.8) {
        sweepOpacity = 0;
      } else if (elapsed < 5.8) {
        sweepOpacity = (elapsed - 4.8) / 1.0;
      }
    }

    if (shaderRef.current) {
      shaderRef.current.uniforms.uSweepAngle.value = sweep;
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      shaderRef.current.uniforms.uOpacity.value = sweepOpacity;
    }
    if (leadLineRef.current) {
      leadLineRef.current.rotation.y = -sweep;
    }
    if (leadMatRef.current) {
      leadMatRef.current.opacity = 0.9 * sweepOpacity;
    }
  });

  return (
    <group>
      <mesh geometry={sectorGeo}>
        <shaderMaterial
          ref={shaderRef}
          args={[VolumetricSweepShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <lineSegments ref={leadLineRef} geometry={leadLineGeo}>
        <lineBasicMaterial ref={leadMatRef} color={PALETTE.emerald} transparent opacity={0} linewidth={2} />
      </lineSegments>
    </group>
  );
}

// --- 4. Corner Bounding Box Component ---
function BoundingBox3D({ size = 1.1, active = false }: { size?: number; active?: boolean }) {
  const geometry = useMemo(() => {
    const s = size / 2;
    const c = s * 0.35;

    const verts: number[] = [];
    const corners = [
      [-s, -s, -s], [s, -s, -s], [-s, s, -s], [s, s, -s],
      [-s, -s, s], [s, -s, s], [-s, s, s], [s, s, s],
    ];

    corners.forEach(([x, y, z]) => {
      const dx = x > 0 ? -c : c;
      const dy = y > 0 ? -c : c;
      const dz = z > 0 ? -c : c;

      verts.push(x, y, z, x + dx, y, z);
      verts.push(x, y, z, x, y + dy, z);
      verts.push(x, y, z, x, y, z + dz);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [size]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={active ? PALETTE.emerald : PALETTE.cyan}
        transparent
        opacity={active ? 0.95 : 0.4}
        linewidth={active ? 2 : 1}
      />
    </lineSegments>
  );
}

// --- 5. Interactive Node & Label Component ---
function NodeItem({
  node,
  sweepRef,
  accumTimeRef,
  isReducedMotion,
}: {
  node: DetectionNode;
  sweepRef: React.MutableRefObject<number>;
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const lastSweepRef = useRef(0);

  const coreRef = useRef<THREE.Mesh>(null!);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const boxGroupRef = useRef<THREE.Group>(null!);
  const boxMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const labelWrapRef = useRef<HTMLDivElement>(null!);
  const labelInnerRef = useRef<HTMLDivElement>(null!);

  const emerald = useMemo(() => new THREE.Color(PALETTE.emerald), []);
  const cyan = useMemo(() => new THREE.Color(PALETTE.cyan), []);

  const nodeAngle = useMemo(() => {
    let a = Math.atan2(node.z, node.x);
    if (a < 0) a += Math.PI * 2;
    return a;
  }, [node.x, node.z]);

  const boxGeo = useMemo(() => {
    const s = 0.5;
    const c = s * 0.35;
    const verts: number[] = [];
    const corners = [
      [-s, -s, -s], [s, -s, -s], [-s, s, -s], [s, s, -s],
      [-s, -s, s], [s, -s, s], [-s, s, s], [s, s, s],
    ];
    corners.forEach(([x, y, z]) => {
      const dx = x > 0 ? -c : c;
      const dy = y > 0 ? -c : c;
      const dz = z > 0 ? -c : c;
      verts.push(x, y, z, x + dx, y, z);
      verts.push(x, y, z, x, y + dy, z);
      verts.push(x, y, z, x, y, z + dz);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    let act = 0;
    const elapsed = accumTimeRef.current;

    if (isReducedMotion) {
      act = 0.7;
    } else if (elapsed < 4.8) {
      act = 0;
    } else if (elapsed < 5.8) {
      const nodeFade = (elapsed - 4.8) / 1.0;
      act = 0.1 * nodeFade;
    } else {
      const sweep = sweepRef.current;
      const diff = Math.abs(sweep - nodeAngle);
      const PI2 = Math.PI * 2;
      const minDiff = Math.min(diff, PI2 - diff);
      if (minDiff < 0.22) lastSweepRef.current = state.clock.getElapsedTime();
      const elapsedSweep = state.clock.getElapsedTime() - lastSweepRef.current;
      act = elapsedSweep < 3.0 ? Math.max(0, 1.0 - elapsedSweep / 3.0) : 0.08;
    }
    const isActive = act > 0.35;
    const isVisible = act > 0.05;

    if (coreRef.current) coreRef.current.scale.setScalar(isActive ? 0.14 / 0.09 : 1);
    if (coreMatRef.current) {
      coreMatRef.current.color.copy(isActive ? emerald : cyan);
      coreMatRef.current.opacity = isVisible ? (isActive ? 0.95 : 0.5) : 0;
    }
    if (ringMatRef.current) {
      ringMatRef.current.color.copy(isActive ? emerald : cyan);
      ringMatRef.current.opacity = isVisible ? (isActive ? 0.8 : 0.3) : 0;
    }
    if (boxGroupRef.current) boxGroupRef.current.scale.setScalar(isActive ? 1.15 : 0.95);
    if (boxMatRef.current) {
      boxMatRef.current.color.copy(isActive ? emerald : cyan);
      boxMatRef.current.opacity = isVisible ? (isActive ? 0.95 : 0.4) : 0;
    }

    if (labelWrapRef.current) labelWrapRef.current.style.display = isVisible ? 'block' : 'none';
    if (labelInnerRef.current) {
      labelInnerRef.current.style.opacity = String(Math.min(1, act * 1.4));
      labelInnerRef.current.style.transform = `scale(${0.9 + act * 0.15})`;
    }
  });

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh ref={coreRef} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial ref={coreMatRef} color={PALETTE.cyan} transparent opacity={0} />
      </mesh>

      <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.2, 0.28, 24]} />
        <meshBasicMaterial ref={ringMatRef} color={PALETTE.cyan} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <group ref={boxGroupRef} position={[0, 0.4, 0]}>
        <lineSegments geometry={boxGeo}>
          <lineBasicMaterial ref={boxMatRef} color={PALETTE.cyan} transparent opacity={0} />
        </lineSegments>
      </group>

      <Html position={[0, 1.3, 0]} center distanceFactor={14} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
        <div ref={labelWrapRef} style={{ display: 'none' }}>
          <div
            ref={labelInnerRef}
            style={{ transition: 'opacity 0.25s ease, transform 0.25s ease' }}
            className="flex flex-col items-start font-mono text-[10px] tracking-wider leading-tight text-[#10b981] bg-[#06090e]/90 border border-[#10b981]/50 px-2 py-1 rounded shadow-[0_0_12px_rgba(16,185,129,0.35)] backdrop-blur-md whitespace-nowrap select-none"
          >
            <div className="flex items-center gap-1.5 border-b border-[#10b981]/30 pb-0.5 mb-0.5 w-full">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span className="font-bold text-[#f3f6fb]">{node.label}</span>
              <span className="text-[9px] text-[#22d3ee] font-semibold ml-auto">{node.confidence}</span>
            </div>
            <div className="text-[8.5px] text-[#22d3ee]/80">
              ID: SEC_0{node.id} // {node.category}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// --- 6. Floating Dust Particles Component ---
function FloatingDust() {
  const count = 350;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const emRgb = PALETTE.emeraldRgb;
    const cyRgb = PALETTE.cyanRgb;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 32;
      posArray[i * 3 + 1] = Math.random() * 6 + 0.2;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 32;

      const isCyan = Math.random() > 0.6;
      const rgb = isCyan ? cyRgb : emRgb;
      colorArray[i * 3] = rgb[0];
      colorArray[i * 3 + 1] = rgb[1];
      colorArray[i * 3 + 2] = rgb[2];
    }

    return [posArray, colorArray];
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * 0.18;
      let x = pos.getX(i) + Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.003;
      if (y > 6.5) y = 0.2;
      pos.setY(i, y);
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// --- 7. Camera Orbit, Intro Transition & Parallax Controller ---
function CameraRig({
  accumTimeRef,
  isReducedMotion,
}: {
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const { camera, pointer } = useThree();
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    if (isReducedMotion) {
      camera.position.set(0, 8.5, 13.5);
      camera.lookAt(0, 0.4, 0);
      return;
    }

    const elapsed = accumTimeRef.current;

    const mouseParallaxX = pointer.x * 1.8;
    const mouseParallaxY = pointer.y * 0.9;

    let targetX: number;
    let targetY: number;
    let targetZ: number;
    let lookAtY: number;

    if (elapsed < 5.0) {
      targetX = mouseParallaxX * 0.6;
      targetY = 0.2 + mouseParallaxY * 0.4;
      targetZ = 8.5;
      lookAtY = 0.2;
    } else if (elapsed < 6.0) {
      const transitionProgress = (elapsed - 5.0) / 1.0;
      const easeTrans = 1.0 - Math.pow(1.0 - transitionProgress, 3);

      angleRef.current += delta * 0.07;
      const radius = 13.0;
      const radarX = Math.sin(angleRef.current) * radius + mouseParallaxX;
      const radarZ = Math.cos(angleRef.current) * radius;
      const radarY = 7.8 + mouseParallaxY;

      targetX = THREE.MathUtils.lerp(mouseParallaxX * 0.6, radarX, easeTrans);
      targetY = THREE.MathUtils.lerp(0.2 + mouseParallaxY * 0.4, radarY, easeTrans);
      targetZ = THREE.MathUtils.lerp(8.5, radarZ, easeTrans);
      lookAtY = THREE.MathUtils.lerp(0.2, 0.4, easeTrans);
    } else {
      angleRef.current += delta * 0.07;
      const radius = 13.0;
      targetX = Math.sin(angleRef.current) * radius + mouseParallaxX;
      targetZ = Math.cos(angleRef.current) * radius;
      targetY = 7.8 + mouseParallaxY;
      lookAtY = 0.4;
    }

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.06);
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
}

// --- 8. Controlador Dinámico del Texto del HUD según la Fase ---
function HUDPhaseController({
  accumTimeRef,
  isReducedMotion,
  hudTextRef,
  hudStatusRef,
}: {
  accumTimeRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
  hudTextRef: React.RefObject<HTMLSpanElement>;
  hudStatusRef: React.RefObject<HTMLDivElement>;
}) {
  const lastPhaseRef = useRef(-1);

  useFrame(() => {
    if (isReducedMotion) {
      if (lastPhaseRef.current !== 2) {
        lastPhaseRef.current = 2;
        if (hudTextRef.current) hudTextRef.current.innerText = 'XOLSEC RADAR v4.2';
        if (hudStatusRef.current) hudStatusRef.current.innerText = 'SYS_STATUS: ONLINE';
      }
      return;
    }

    const elapsed = accumTimeRef.current;
    let phase = 0;
    if (elapsed >= 5.0) {
      phase = 2;
    } else if (elapsed >= 2.5) {
      phase = 1;
    }

    if (phase !== lastPhaseRef.current) {
      lastPhaseRef.current = phase;
      if (hudTextRef.current && hudStatusRef.current) {
        if (phase === 0) {
          hudTextRef.current.innerText = 'CALIBRANDO SENSOR // PTZ-CAM-01';
          hudStatusRef.current.innerText = 'SYS_STATUS: CALIBRATING';
        } else if (phase === 1) {
          hudTextRef.current.innerText = 'BARRIDO PTZ // PERÍMETRO';
          hudStatusRef.current.innerText = 'SYS_STATUS: SCANNING';
        } else {
          hudTextRef.current.innerText = 'XOLSEC RADAR v4.2';
          hudStatusRef.current.innerText = 'SYS_STATUS: ONLINE';
        }
      }
    }
  });

  return null;
}

// --- 9. Main Scene Content Wrapper ---
function RadarSceneContent({
  isReducedMotion,
  hudTextRef,
  hudStatusRef,
}: {
  isReducedMotion: boolean;
  hudTextRef: React.RefObject<HTMLSpanElement>;
  hudStatusRef: React.RefObject<HTMLDivElement>;
}) {
  const sweepRef = useRef(0);
  const { size } = useThree();

  const accumTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (accumTimeRef.current < 6.5) {
      accumTimeRef.current += delta;
    }

    if (isReducedMotion) {
      sweepRef.current = 1.2;
      return;
    }

    const elapsed = accumTimeRef.current;

    if (elapsed >= 4.8) {
      let next = sweepRef.current + delta * 0.85;
      if (next >= Math.PI * 2) next -= Math.PI * 2;
      sweepRef.current = next;
    } else {
      sweepRef.current = 0;
    }
  });

  return (
    <>
      <CanvasResizeHandler />
      <CameraRig accumTimeRef={accumTimeRef} isReducedMotion={isReducedMotion} />
      <HUDPhaseController
        accumTimeRef={accumTimeRef}
        isReducedMotion={isReducedMotion}
        hudTextRef={hudTextRef}
        hudStatusRef={hudStatusRef}
      />

      <ambientLight intensity={0.4} color={PALETTE.bg} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color={PALETTE.emerald} />
      <pointLight position={[0, 4, 0]} intensity={1.5} color={PALETTE.cyan} distance={15} />

      <PTZCameraAssembly accumTimeRef={accumTimeRef} isReducedMotion={isReducedMotion} />
      <TerrainGrid accumTimeRef={accumTimeRef} isReducedMotion={isReducedMotion} />
      <RadarSweep sweepRef={sweepRef} accumTimeRef={accumTimeRef} isReducedMotion={isReducedMotion} />

      {NODES.map((node) => (
        <NodeItem
          key={node.id}
          node={node}
          sweepRef={sweepRef}
          accumTimeRef={accumTimeRef}
          isReducedMotion={isReducedMotion}
        />
      ))}

      <FloatingDust />

      <EffectComposer
        key={`${Math.round(size.width)}-${Math.round(size.height)}`}
        enableNormalPass={false}
      >
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.06}
          bokehScale={1.8}
        />
      </EffectComposer>
    </>
  );
}

// --- 10. Self-Contained Default Export Component ---
export default function XolsecHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isInView, setIsInView] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const hudTextRef = useRef<HTMLSpanElement>(null!);
  const hudStatusRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full aspect-square overflow-hidden rounded-2xl border border-[#10b981]/20 bg-[#06090e]/40 backdrop-blur-sm shadow-[0_0_50px_-15px_rgba(16,185,129,0.25)] select-none"
    >
      {/* Scanline Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(16, 185, 129, 0.08) 0px, rgba(16, 185, 129, 0.08) 1px, transparent 1px, transparent 4px)',
        }}
        aria-hidden
      />

      {/* Top HUD Frame Header */}
      <div className="pointer-events-none absolute top-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] text-[#22d3ee]/80 border-b border-[#10b981]/20 pb-1.5">
        <div className="flex items-center gap-2 text-[#10b981]">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span ref={hudTextRef} className="font-bold tracking-widest">
            CALIBRANDO SENSOR // PTZ-CAM-01
          </span>
        </div>
        <div ref={hudStatusRef} className="tracking-widest">
          SYS_STATUS: CALIBRATING
        </div>
      </div>

      {/* Bottom HUD Coordinates */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[9px] text-[#10b981]/70">
        <div>LAT: 19°25&apos;42&quot;N // LON: 99°07&apos;39&quot;W</div>
        <div className="text-[#22d3ee]">BEAM_FREQ: 24.150 GHz</div>
      </div>

      {/* Three.js R3F Canvas Container */}
      <Canvas
        className="absolute inset-0 w-full h-full"
        camera={{ position: [0, 0.2, 8.5], fov: 40 }}
        dpr={[1, 2]}
        frameloop={isReducedMotion ? 'demand' : isInView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <RadarSceneContent
          isReducedMotion={isReducedMotion}
          hudTextRef={hudTextRef}
          hudStatusRef={hudStatusRef}
        />
      </Canvas>
    </div>
  );
}
