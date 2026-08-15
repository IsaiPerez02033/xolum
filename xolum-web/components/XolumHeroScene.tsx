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

// --- 0. Control Activo del Tamaño del Canvas (Fix permanente para 100% de cobertura) ---
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

// --- 1. Procedural AI Polyhedral Central Core ---
function AICore({ isReducedMotion }: { isReducedMotion: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerPolyRef = useRef<THREE.Mesh>(null!);
  const coreSphereRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

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
      const breath = Math.sin(t * 1.6);
      const scale = 1.0 + breath * 0.05;
      coreSphereRef.current.scale.set(scale, scale, scale);
    }

    if (lightRef.current) {
      const breath = Math.sin(t * 1.6);
      lightRef.current.intensity = 2.2 + breath * 0.35;
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

      <pointLight ref={lightRef} color={PALETTE.cyan} intensity={2.2} distance={8} />
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

// --- 3. Subtle 3D Wireframe Ground Plane (Ampliado 70x70) ---
function WireframeGround() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(70, 70, 80, 80);
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
  const count = 300;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyRgb = PALETTE.cyanRgb;
    const emRgb = PALETTE.emeraldRgb;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

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

    const radius = 11.5;
    const camX = Math.sin(angleRef.current) * radius + mouseX;
    const camZ = Math.cos(angleRef.current) * radius;
    const camY = 4.2 + mouseY;

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
      <CanvasResizeHandler />
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

  // Live OS Telemetry state
  const [latency, setLatency] = useState(12);
  const [nodesCount, setNodesCount] = useState(22);
  const [aiState, setAiState] = useState<'ACTIVE' | 'PROCESSING' | 'OPTIMIZED'>('ACTIVE');
  const [statusPulse, setStatusPulse] = useState(true);

  // 3D Card tilt lerp state
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null!);

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

  // Live System OS Telemetry updates (subtle, non-repetitive micro changes)
  useEffect(() => {
    const latencyInterval = setInterval(() => {
      // Jitter latency between 10ms and 14ms
      setLatency(10 + Math.floor(Math.random() * 5));
    }, 2800);

    const nodesInterval = setInterval(() => {
      // Fluctuate node count between 22 and 24
      setNodesCount(22 + (Math.random() > 0.6 ? 1 : 0));
    }, 4200);

    const aiInterval = setInterval(() => {
      const states: ('ACTIVE' | 'PROCESSING' | 'OPTIMIZED')[] = ['ACTIVE', 'OPTIMIZED', 'ACTIVE', 'PROCESSING'];
      setAiState(states[Math.floor(Math.random() * states.length)]);
    }, 5500);

    const pulseInterval = setInterval(() => {
      setStatusPulse((prev) => !prev);
    }, 1800);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(nodesInterval);
      clearInterval(aiInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  // 3D Tilt RAF loop
  useEffect(() => {
    if (isReducedMotion) return;

    let rafId: number;
    const animateTilt = () => {
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRotation.current.x.toFixed(3)}deg) rotateY(${currentRotation.current.y.toFixed(3)}deg)`;
      }

      rafId = requestAnimationFrame(animateTilt);
    };

    animateTilt();
    return () => cancelAnimationFrame(rafId);
  }, [isReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    // Max 3.2 degrees pitch and roll tilt
    targetRotation.current = {
      x: -normY * 3.2,
      y: normX * 3.2,
    };
  };

  const handleMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="stage-dark relative w-full h-full aspect-square overflow-hidden rounded-2xl border border-[#22d3ee]/25 bg-[#070b12] shadow-[0_0_50px_-15px_rgba(34,211,238,0.3)] select-none transition-shadow duration-300 hover:shadow-[0_0_60px_-10px_rgba(34,211,238,0.4)]"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.05s ease-out' }}
      >
        {/* Layer A: Scanline texture */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.08) 0px, rgba(34, 211, 238, 0.08) 1px, transparent 1px, transparent 4px)',
            transform: 'translateZ(6px)',
          }}
          aria-hidden
        />

        {/* Layer B: Header Telemetry OS Bar */}
        <div
          className="pointer-events-none absolute top-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] text-[#22d3ee]/80 border-b border-[#22d3ee]/20 pb-1.5"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center gap-2 text-[#22d3ee]">
            <span className={`w-2 h-2 rounded-full bg-[#22d3ee] ${statusPulse ? 'opacity-100 shadow-[0_0_8px_#22d3ee]' : 'opacity-60'} transition-opacity duration-300`} />
            <span className="font-bold tracking-widest">XOLUM // CORE v1.0</span>
          </div>
          <div className="tracking-widest text-[#10b981] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            STATUS: OPER
          </div>
        </div>

        {/* Layer C: Footer Telemetry OS Bar */}
        <div
          className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[9px] text-[#22d3ee]/70"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex items-center gap-2">
            <span>NODES: {nodesCount}</span>
            <span className="opacity-40">//</span>
            <span>LATENCY: {latency}ms</span>
          </div>
          <div className="text-[#10b981] font-semibold flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#10b981]" />
            AI_ENGINE: {aiState}
          </div>
        </div>

        {/* Layer D: 3D Canvas */}
        <div style={{ transform: 'translateZ(10px)', width: '100%', height: '100%' }}>
          <Canvas
            className="absolute inset-0 w-full h-full"
            camera={{ position: [0, 4.5, 12.0], fov: 40 }}
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
      </div>
    </div>
  );
}
