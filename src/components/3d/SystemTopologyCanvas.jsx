import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import * as THREE from 'three';

// ─── Canvas Interior Component ────────────────────────────────────────────────
function ArchitectureNodes({ mouseX, mouseY, isCanvasHovered }) {
  const groupRef = useRef();
  const idleTime = useRef(0);

  const nodes = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 4; i++) arr.push({ pos: new THREE.Vector3(-4, (i - 1.5) * 1.6, (i % 2) * 0.8), layer: 'gateway', scale: 0.28 });
    for (let i = 0; i < 5; i++) arr.push({ pos: new THREE.Vector3(0, (i - 2) * 1.4, (i % 3 - 1) * 1.2), layer: 'engine', scale: 0.38 });
    for (let i = 0; i < 4; i++) arr.push({ pos: new THREE.Vector3(4, (i - 1.5) * 1.6, (i % 2) * 0.8), layer: 'storage', scale: 0.3 });
    return arr;
  }, []);

  const { linePositions, lineColors } = React.useMemo(() => {
    const posArr = [], colorArr = [];
    const amberCore = new THREE.Color('#f59e0b');
    const amberSubtle = new THREE.Color('#78350f');
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < 4.2 && nodes[i].pos.x !== nodes[j].pos.x) {
          posArr.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z, nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
          const isCore = nodes[i].layer === 'engine' || nodes[j].layer === 'engine';
          const c = isCore ? amberCore : amberSubtle;
          colorArr.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }
    return { linePositions: new Float32Array(posArr), lineColors: new Float32Array(colorArr) };
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    idleTime.current = t;

    // Pointer-driven rotation — tighter lerp for snappier feel
    const targetX = mouseY.current * 0.20;
    // Add subtle idle drift on Y when no pointer, interrupted by mouse
    const mouseMagnitude = Math.abs(mouseX.current) + Math.abs(mouseY.current);
    const idleDrift = mouseMagnitude < 0.05 ? Math.sin(t * 0.12) * 0.15 : 0;
    const targetY = mouseX.current * 0.30 + t * 0.03 + idleDrift;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06);
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, idx) => {
        const isEngine = node.layer === 'engine';
        // When canvas is hovered, engine nodes slightly brighten; others dim
        const baseOpacity = isEngine ? 0.95 : 0.6;
        const hoveredOpacity = isEngine ? 1.0 : 0.35;

        return (
          <mesh key={idx} position={node.pos}>
            <boxGeometry args={[node.scale, node.scale, node.scale]} />
            <meshBasicMaterial
              color={isEngine ? '#f59e0b' : '#d97706'}
              wireframe={!isEngine}
              transparent
              opacity={isCanvasHovered ? hoveredOpacity : baseOpacity}
            />
          </mesh>
        );
      })}

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={lineColors.length / 3} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={isCanvasHovered ? 0.42 : 0.28} />
      </lineSegments>
    </group>
  );
}

// ─── Exported Component ────────────────────────────────────────────────────────
export default function SystemTopologyCanvas() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const handleMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-bg-border/40 bg-bg-card/40 rounded p-4">
        <div className="text-center font-mono text-xs text-steel-400">
          <div className="text-amber-500 mb-1">SYSTEM ARCHITECTURE MATRIX</div>
          <div>[ Gateway ] ── [ Engine ] ── [ Storage ]</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative min-h-[260px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ArchitectureNodes mouseX={mouseX} mouseY={mouseY} isCanvasHovered={isHovered} />
      </Canvas>

      <div className="absolute bottom-3 left-4 font-mono text-[10px] text-steel-600 flex items-center gap-3 pointer-events-none select-none">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
          SYS.TOPOLOGY.ACTIVE
        </span>
        <span className="hidden sm:inline text-steel-600">| GATEWAY → CORE → PERSISTENCE</span>
      </div>
    </div>
  );
}
