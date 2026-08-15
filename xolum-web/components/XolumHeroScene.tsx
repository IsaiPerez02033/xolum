'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

// Palette LOCKED to XOLUM Brand (Cyan Leads, Emerald Accents)
const PALETTE = {
  cyan: '#22d3ee',
  cyanRgb: [0.1333, 0.8275, 0.9333] as [number, number, number],
  emerald: '#10b981',
  emeraldRgb: [0.0627, 0.7255, 0.5059] as [number, number, number],
  bg: '#06090e',
};

// --- 1. Procedural AI Polyhedral Central Core ---
function AICore({ isReducedMotion }: { isReducedMotion: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerPolyRef = useRef<THREE.Mesh>(null!);
  const coreSphereRef = useRef<THREE.Mesh>(null!);

  const { outerGeo, innerPolyGeo, sphereGeo } = useMemo(() => {
    const outer = new THREE.IcosahedronGeometry(1.65, 1);
    const inner = new THREE.OctahedronGeometry(1.05, 0);
    const sphere = new THREE.SphereGeometry(0.55, 24, 24);
    return { outerGeo: outer, innerPolyGeo: inner, sphereGeo: sphere };
  }, []);

  useFrame((state) => {
    if (isReducedMotion) return;

    const t = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.25;
      outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
    }

    if (innerPolyRef.current) {
      innerPolyRef.current.rotation.y = -t * 0.4;
      innerPolyRef.current.rotation.z = Math.cos(t * 0.2) * 0.4;
    }

    if (coreSphereRef.current) {
      const scale = 1.0 + Math.sin(t * 2.2) * 0.06;
      coreSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={outerRef} geometry={outerGeo}>
        <meshBasicMaterial
          color={PALETTE.cyan}
          wireframe
          transparent
          opacity={0.45}
          wireframeLinewidth={1.5}
        />
      </mesh>

      <mesh ref={innerPolyRef} geometry={innerPolyGeo}>
        <meshBasicMaterial
          color={PALETTE.emerald}
          wireframe
          transparent
          opacity={0.65}
          wireframeLinewidth={1.5}
        />
      </mesh>

      <mesh ref={coreSphereRef} geometry={sphereGeo}>
        <meshBasicMaterial
          color={PALETTE.cyan}
          transparent
          opacity={0.85}
        />
      </mesh>

      <pointLight color={PALETTE.cyan} intensity={2.2} distance={8} />
    </group>
  );
}

// --- 2. Data Constellation Network & Flowing Packets ---
function DataConstellation({ isReducedMotion }: { isReducedMotion: boolean }) {
  const packetPointsRef = useRef<THREE.Points>(null!);

  const { nodePositions, lineVertices, edges } = useMemo(() => {
    const count = 22;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const radius = 2.8 + (i % 5) * 0.75;
      const theta = (i / count) * Math.PI * 2 + (i % 3) * 0.4;
      const phi = (Math.sin(i * 1.7) * Math.PI) / 3.2;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi) + (i % 2 === 0 ? 0.3 : -0.3);
      const z = radius * Math.sin(theta) * Math.cos(phi);
      nodes.push(new THREE.Vector3(x, y, z));
    }

    const edgeList: { from: THREE.Vector3; to: THREE.Vector3; speed: number; progress: number }[] = [];
    const lineVerts: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 4.2) {
          lineVerts.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
          edgeList.push({
            from: nodes[i],
            to: nodes[j],
            speed: 0.35 + (edgeList.length % 4) * 0.15,
            progress: (edgeList.length * 0.17) % 1.0,
          });
        }
      }
    }

    return { nodePositions: nodes, lineVertices: new Float32Array(lineVerts), edges: edgeList };
  }, []);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
    return geo;
  }, [lineVertices]);

  const [packetPositions, packetColors] = useMemo(() => {
    const pos = new Float32Array(edges.length * 3);
    const col = new Float32Array(edges.length * 3);

    const cyRgb = PALETTE.cyanRgb;
    const emRgb = PALETTE.emeraldRgb;

    edges.forEach((edge, i) => {
      pos[i * 3] = edge.from.x;
      pos[i * 3 + 1] = edge.from.y;
      pos[i * 3 + 2] = edge.from.z;

      const isEmerald = i % 3 === 0;
      const rgb = isEmerald ? emRgb : cyRgb;
      col[i * 3] = rgb[0];
      col[i * 3 + 1] = rgb[1];
      col[i * 3 + 2] = rgb[2];
    });

    return [pos, col];
  }, [edges]);

  const packetGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));
    return geo;
  }, [packetPositions, packetColors]);

  useFrame((_, delta) => {
    if (isReducedMotion || !packetPointsRef.current) return;

    const posAttr = packetPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    edges.forEach((edge, i) => {
      edge.progress += delta * edge.speed;
      if (edge.progress > 1.0) edge.progress -= 1.0;

      const px = THREE.MathUtils.lerp(edge.from.x, edge.to.x, edge.progress);
      const py = THREE.MathUtils.lerp(edge.from.y, edge.to.y, edge.progress);
      const pz = THREE.MathUtils.lerp(edge.from.z, edge.to.z, edge.progress);

      posAttr.setXYZ(i, px, py, pz);
    });

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[idx % 4 === 0 ? 0.12 : 0.08, 12, 12]} />
          <meshBasicMaterial
            color={idx % 4 === 0 ? PALETTE.emerald : PALETTE.cyan}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          color={PALETTE.cyan}
          transparent
          opacity={0.22}
          linewidth={1}
        />
      </lineSegments>

      <points ref={packetPointsRef} geometry={packetGeo}>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// --- 3. Subtle 3D Wireframe Ground Plane ---
function WireframeGround() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(24, 24, 36, 36);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -3.2, 0);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      pos.setY(i, -3.2 + Math.sin(dist * 0.4) * 0.15);
    }
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={PALETTE.cyan}
        wireframe
        transparent
        opacity={0.14}
      />
    </mesh>
  );
}

// --- 4. Floating Dust Particles Component ---
function FloatingDust() {
  const count = 200;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyRgb = PALETTE.cyanRgb;
    const emRgb = PALETTE.emeraldRgb;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const isEmerald = Math.random() > 0.65;
      const rgb = isEmerald ? emRgb : cyRgb;
      col[i * 3] = rgb[0];
      col[i * 3 + 1] = rgb[1];
      col[i * 3 + 2] = rgb[2];
    }

    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + delta * 0.15;
      let x = posAttr.getX(i) + Math.sin(state.clock.getElapsedTime() * 0.4 + i) * 0.003;
      if (y > 5.0) y = -3.0;
      posAttr.setY(i, y);
      posAttr.setX(i, x);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// --- 5. Orbiting Camera Rig with Mouse Parallax ---
function CameraRig({ isReducedMotion }: { isReducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    if (isReducedMotion) {
      camera.position.set(0, 4.5, 12.0);
      camera.lookAt(0, 0.1, 0);
      return;
    }

    angleRef.current += delta * 0.08;

    const mouseX = pointer.x * 1.6;
    const mouseY = pointer.y * 0.8;

    const radius = 12.0;
    const camX = Math.sin(angleRef.current) * radius + mouseX;
    const camZ = Math.cos(angleRef.current) * radius;
    const camY = 4.5 + mouseY;

    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.05);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

// --- 6. Main 3D Scene Composition ---
function ConstellationScene({ isReducedMotion }: { isReducedMotion: boolean }) {
  const { size } = useThree();

  return (
    <>
      <CameraRig isReducedMotion={isReducedMotion} />

      <ambientLight intensity={0.35} color={PALETTE.bg} />
      <directionalLight position={[6, 8, 6]} intensity={0.9} color={PALETTE.cyan} />
      <pointLight position={[0, -1, 0]} intensity={1.4} color={PALETTE.emerald} distance={12} />

      <AICore isReducedMotion={isReducedMotion} />
      <DataConstellation isReducedMotion={isReducedMotion} />
      <WireframeGround />
      <FloatingDust />

      <EffectComposer
        key={`${Math.round(size.width)}-${Math.round(size.height)}`}
        enableNormalPass={false}
      >
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <DepthOfField
          focusDistance={0.03}
          focalLength={0.06}
          bokehScale={1.8}
        />
      </EffectComposer>
    </>
  );
}

// --- 7. Self-Contained Default Export Component ---
export default function XolumHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isInView, setIsInView] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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
      className="relative w-full h-full aspect-square overflow-hidden rounded-2xl border border-[#22d3ee]/20 bg-[#06090e]/40 backdrop-blur-sm shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)] select-none"
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.08) 0px, rgba(34, 211, 238, 0.08) 1px, transparent 1px, transparent 4px)',
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute top-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] text-[#22d3ee]/80 border-b border-[#22d3ee]/20 pb-1.5">
        <div className="flex items-center gap-2 text-[#22d3ee]">
          <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
          <span className="font-bold tracking-widest">XOLUM // CORE v1.0</span>
        </div>
        <div className="tracking-widest text-[#10b981] font-semibold">STATUS: OPER</div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[9px] text-[#22d3ee]/70">
        <div>NODES: 22 // LATENCY: 12ms</div>
        <div className="text-[#10b981]">AI_ENGINE: ACTIVE</div>
      </div>

      <Canvas
        className="absolute inset-0 w-full h-full"
        camera={{ position: [0, 4.5, 12.0], fov: 45 }}
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
        <ConstellationScene isReducedMotion={isReducedMotion} />
      </Canvas>
    </div>
  );
}
