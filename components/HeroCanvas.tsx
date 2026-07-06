"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

function XMark() {
  const group = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    // Ease the mark toward the pointer for a weighty, liquid follow
    group.current.rotation.y += (pointer.x * 0.45 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-pointer.y * 0.35 - group.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <group ref={group}>
        <RoundedBox args={[4.4, 1.15, 1.15]} radius={0.55} smoothness={8} rotation={[0, 0, Math.PI / 4]}>
          <meshPhysicalMaterial
            color="#dcdaf0"
            metalness={1}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
        <RoundedBox args={[4.4, 1.15, 1.15]} radius={0.55} smoothness={8} rotation={[0, 0, -Math.PI / 4]}>
          <meshPhysicalMaterial
            color="#dcdaf0"
            metalness={1}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <XMark />
      {/* Studio-style env built from lightformers — no external HDR fetch */}
      <Environment resolution={256}>
        <Lightformer intensity={4} position={[0, 3, 4]} scale={[8, 3, 1]} />
        <Lightformer intensity={2.5} position={[-5, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer
          intensity={6}
          color="#2016e8"
          position={[6, -2, 3]}
          scale={[2, 5, 1]}
        />
        <Lightformer intensity={1.5} position={[0, -4, 2]} scale={[10, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
