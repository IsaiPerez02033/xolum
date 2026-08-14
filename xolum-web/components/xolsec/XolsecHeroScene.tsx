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

// --- 1. Procedural 3D Terrain Grid Component ---
function TerrainGrid() {
  const { geometry, ringsGeometry } = useMemo(() => {
    const width = 22;
    const height = 22;
    const segments = 44;

    const planeGeo = new THREE.PlaneGeometry(width, height, segments, segments);
    planeGeo.rotateX(-Math.PI / 2);

    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getTerrainHeight(x, z));
    }
    planeGeo.computeVertexNormals();

    // Radar Concentric Circles on Ground Plane
    const ringsGroupGeo = new THREE.BufferGeometry();
    const ringVerts: number[] = [];
    const ringRadii = [3.0, 6.0, 9.0];
    const ringSegments = 64;

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

  return (
    <group>
      {/* Subtle base terrain surface */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={PALETTE.bg} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Primary emerald wireframe grid */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={PALETTE.emerald}
          wireframe
          transparent
          opacity={0.22}
          wireframeLinewidth={1}
        />
      </mesh>

      {/* Radar concentric circles in cyan */}
      <lineSegments geometry={ringsGeometry}>
        <lineBasicMaterial color={PALETTE.cyan} transparent opacity={0.35} linewidth={1} />
      </lineSegments>
    </group>
  );
}

// --- 2. Volumetric Radar Sweep Cone Sector ---
const VolumetricSweepShader = {
  uniforms: {
    uTime: { value: 0 },
    uSweepAngle: { value: 0 },
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
    uniform vec3 uColorBeam;
    uniform vec3 uColorLead;

    #define PI 3.14159265359

    void main() {
      float dist = length(vWorldPosition.xz);
      if (dist > 10.5 || dist < 0.2) discard;

      float fragAngle = atan(vWorldPosition.z, vWorldPosition.x);
      if (fragAngle < 0.0) fragAngle += 2.0 * PI;

      float diff = uSweepAngle - fragAngle;
      if (diff < 0.0) diff += 2.0 * PI;

      // Sector width 60 degrees (1.047 rad)
      float sectorWidth = 1.047;
      if (diff > sectorWidth) discard;

      // Leading edge glow
      float leadNormalized = 1.0 - (diff / sectorWidth); // 1.0 at front edge, 0.0 at tail
      float beamIntensity = pow(leadNormalized, 2.8);
      float leadEdgeGlow = smoothstep(0.94, 1.0, leadNormalized) * 2.2;

      // Height fade (volumetric cone falloff)
      float heightFade = smoothstep(0.0, 0.3, vWorldPosition.y + 0.1) * (1.0 - smoothstep(1.8, 2.6, vWorldPosition.y));

      // Radius fade (soft edge at maximum distance)
      float distFade = 1.0 - smoothstep(7.5, 10.5, dist);

      float alpha = (beamIntensity * 0.38 + leadEdgeGlow * 0.85) * heightFade * distFade;

      vec3 color = mix(uColorBeam, uColorLead, leadEdgeGlow * 0.7);
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

function RadarSweep({
  sweepRef,
}: {
  sweepRef: React.MutableRefObject<number>;
}) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const leadLineRef = useRef<THREE.LineSegments>(null!);

  const sectorGeo = useMemo(() => {
    // 3D cone sector cylinder
    const geo = new THREE.CylinderGeometry(0.1, 10.5, 2.4, 64, 1, true, 0, Math.PI * 2);
    geo.translate(0, 1.2, 0);
    return geo;
  }, []);

  const leadLineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [0, 0.05, 0, 10.5, 0.05, 0];
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const sweep = sweepRef.current;
    if (shaderRef.current) {
      shaderRef.current.uniforms.uSweepAngle.value = sweep;
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (leadLineRef.current) {
      leadLineRef.current.rotation.y = -sweep;
    }
  });

  return (
    <group>
      {/* Volumetric sector mesh */}
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

      {/* Bright leading sweep line on ground */}
      <lineSegments ref={leadLineRef} geometry={leadLineGeo}>
        <lineBasicMaterial color={PALETTE.emerald} transparent opacity={0.9} linewidth={2} />
      </lineSegments>
    </group>
  );
}

// --- 3. Corner Bounding Box Component for Detected Nodes ---
function BoundingBox3D({ size = 1.1, active = false }: { size?: number; active?: boolean }) {
  const geometry = useMemo(() => {
    const s = size / 2;
    const c = s * 0.35; // Corner bracket length

    const verts: number[] = [];

    // 8 Corner brackets (3 segments per corner)
    const corners = [
      [-s, -s, -s], [s, -s, -s], [-s, s, -s], [s, s, -s],
      [-s, -s, s], [s, -s, s], [-s, s, s], [s, s, s],
    ];

    corners.forEach(([x, y, z]) => {
      const dx = x > 0 ? -c : c;
      const dy = y > 0 ? -c : c;
      const dz = z > 0 ? -c : c;

      // X bracket line
      verts.push(x, y, z, x + dx, y, z);
      // Y bracket line
      verts.push(x, y, z, x, y + dy, z);
      // Z bracket line
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

// --- 4. Interactive Node & Label Component ---
function NodeItem({
  node,
  sweepRef,
  isReducedMotion,
}: {
  node: DetectionNode;
  sweepRef: React.MutableRefObject<number>;
  isReducedMotion: boolean;
}) {
  const lastSweepRef = useRef(0);

  // Refs para mutar directo en cada frame (cero setState = cero re-render de React)
  const coreRef = useRef<THREE.Mesh>(null!);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const boxGroupRef = useRef<THREE.Group>(null!);
  const boxMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const labelWrapRef = useRef<HTMLDivElement>(null!);
  const labelInnerRef = useRef<HTMLDivElement>(null!);

  const emerald = useMemo(() => new THREE.Color(PALETTE.emerald), []);
  const cyan = useMemo(() => new THREE.Color(PALETTE.cyan), []);

  // Angle of node from center
  const nodeAngle = useMemo(() => {
    let a = Math.atan2(node.z, node.x);
    if (a < 0) a += Math.PI * 2;
    return a;
  }, [node.x, node.z]);

  // Caja delimitadora (esquinas) generada una sola vez a tamaño base 1.0
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
    // 1) Calcular activación (0..1) sin tocar el estado de React
    let act: number;
    if (isReducedMotion) {
      act = 0.7;
    } else {
      const sweep = sweepRef.current;
      const diff = Math.abs(sweep - nodeAngle);
      const PI2 = Math.PI * 2;
      const minDiff = Math.min(diff, PI2 - diff);
      if (minDiff < 0.22) lastSweepRef.current = state.clock.getElapsedTime();
      const elapsed = state.clock.getElapsedTime() - lastSweepRef.current;
      act = elapsed < 3.0 ? Math.max(0, 1.0 - elapsed / 3.0) : 0.08;
    }
    const isActive = act > 0.35;
    const isVisible = act > 0.1;

    // 2) Mutar materiales/transforms directamente
    if (coreRef.current) coreRef.current.scale.setScalar(isActive ? 0.14 / 0.09 : 1);
    if (coreMatRef.current) {
      coreMatRef.current.color.copy(isActive ? emerald : cyan);
      coreMatRef.current.opacity = isActive ? 0.95 : 0.5;
    }
    if (ringMatRef.current) {
      ringMatRef.current.color.copy(isActive ? emerald : cyan);
      ringMatRef.current.opacity = isActive ? 0.8 : 0.3;
    }
    if (boxGroupRef.current) boxGroupRef.current.scale.setScalar(isActive ? 1.15 : 0.95);
    if (boxMatRef.current) {
      boxMatRef.current.color.copy(isActive ? emerald : cyan);
      boxMatRef.current.opacity = isActive ? 0.95 : 0.4;
    }

    // 3) Etiqueta HUD: siempre montada, se muestra/oculta y anima por estilo
    if (labelWrapRef.current) labelWrapRef.current.style.display = isVisible ? 'block' : 'none';
    if (labelInnerRef.current) {
      labelInnerRef.current.style.opacity = String(Math.min(1, act * 1.4));
      labelInnerRef.current.style.transform = `scale(${0.9 + act * 0.15})`;
    }
  });

  return (
    <group position={[node.x, node.y, node.z]}>
      {/* Node pulse core */}
      <mesh ref={coreRef} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial ref={coreMatRef} color={PALETTE.cyan} transparent opacity={0.5} />
      </mesh>

      {/* Node ground ring */}
      <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.2, 0.28, 24]} />
        <meshBasicMaterial ref={ringMatRef} color={PALETTE.cyan} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Animated corner bounding box */}
      <group ref={boxGroupRef} position={[0, 0.4, 0]}>
        <lineSegments geometry={boxGeo}>
          <lineBasicMaterial ref={boxMatRef} color={PALETTE.cyan} transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Monospace HUD Overlay Label (siempre montada, mutada por estilo) */}
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

// --- 5. Floating Dust Particles Component ---
function FloatingDust() {
  const count = 220;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const emRgb = PALETTE.emeraldRgb;
    const cyRgb = PALETTE.cyanRgb;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 18;
      posArray[i * 3 + 1] = Math.random() * 5 + 0.2;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 18;

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
      if (y > 5.5) y = 0.2;
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

// --- 6. Camera Orbit & Mouse Parallax Controller ---
function CameraRig({ isReducedMotion }: { isReducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const angleRef = useRef(0);

  useFrame((state, delta) => {
    if (isReducedMotion) {
      camera.position.set(0, 8.5, 13.5);
      camera.lookAt(0, 0.4, 0);
      return;
    }

    // Slow automatic camera orbit around Y
    angleRef.current += delta * 0.07;

    // Mouse Parallax reaction
    const mouseParallaxX = pointer.x * 1.8;
    const mouseParallaxY = pointer.y * 0.9;

    const radius = 14.0;
    const camX = Math.sin(angleRef.current) * radius + mouseParallaxX;
    const camZ = Math.cos(angleRef.current) * radius;
    const camY = 8.5 + mouseParallaxY;

    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.05);
    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

// --- 7. Main Scene Content Wrapper ---
function RadarSceneContent({ isReducedMotion }: { isReducedMotion: boolean }) {
  const sweepRef = useRef(0);

  useFrame((_, delta) => {
    if (!isReducedMotion) {
      let next = sweepRef.current + delta * 0.85; // ~7.4s per full 360 rotation
      if (next >= Math.PI * 2) next -= Math.PI * 2;
      sweepRef.current = next;
    } else {
      sweepRef.current = 1.2; // Static fixed angle for reduced motion
    }
  });

  return (
    <>
      <CameraRig isReducedMotion={isReducedMotion} />

      {/* Ambient and directional lights locked to brand palette */}
      <ambientLight intensity={0.4} color={PALETTE.bg} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color={PALETTE.emerald} />
      <pointLight position={[0, 4, 0]} intensity={1.5} color={PALETTE.cyan} distance={15} />

      {/* Terrain grid */}
      <TerrainGrid />

      {/* Volumetric radar sweep */}
      <RadarSweep sweepRef={sweepRef} />

      {/* 7 Glowing detection nodes with corner bounding boxes & monospace labels */}
      {NODES.map((node) => (
        <NodeItem
          key={node.id}
          node={node}
          sweepRef={sweepRef}
          isReducedMotion={isReducedMotion}
        />
      ))}

      {/* Floating dust particles */}
      <FloatingDust />

      {/* Post-Processing Effects */}
      <EffectComposer enableNormalPass={false}>
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

// --- 8. Self-Contained Default Export Component ---
export default function XolsecHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isInView, setIsInView] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // IntersectionObserver to pause offscreen renders
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

  // Prefers-reduced-motion check
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
      {/* Scanline Post-Process Overlay */}
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
          <span className="font-bold tracking-widest">XOLSEC RADAR v4.2</span>
        </div>
        <div className="tracking-widest">SYS_STATUS: ONLINE</div>
      </div>

      {/* Bottom HUD Coordinates */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[9px] text-[#10b981]/70">
        <div>LAT: 19°25&apos;42&quot;N // LON: 99°07&apos;39&quot;W</div>
        <div className="text-[#22d3ee]">BEAM_FREQ: 24.150 GHz</div>
      </div>

      {/* Three.js R3F Canvas Container */}
      <Canvas
        camera={{ position: [0, 8.5, 13.5], fov: 45 }}
        dpr={[1, 2]}
        frameloop={isReducedMotion ? 'demand' : isInView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <RadarSceneContent isReducedMotion={isReducedMotion} />
      </Canvas>
    </div>
  );
}
