"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function VehicleSilhouette() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.32;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={group}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[3.8, 0.62, 1.5]} />
          <meshStandardMaterial color="#171717" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[-0.45, 0.68, 0]} castShadow>
          <boxGeometry args={[1.8, 0.65, 1.3]} />
          <meshStandardMaterial color="#101010" metalness={0.86} roughness={0.18} />
        </mesh>
        {[[-1.25,-0.25,0.78],[1.25,-0.25,0.78],[-1.25,-0.25,-0.78],[1.25,-0.25,-0.78]].map((p,i)=>(
          <mesh key={i} position={p as [number,number,number]} rotation={[Math.PI/2,0,0]}>
            <cylinderGeometry args={[0.34,0.34,0.16,32]} />
            <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.55} />
          </mesh>
        ))}
        <mesh position={[1.92,0.25,0]}>
          <boxGeometry args={[0.04,0.18,1.05]} />
          <meshStandardMaterial color="#f4b942" emissive="#f4b942" emissiveIntensity={4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Studio() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-6 md:p-10">
        <a href="/" className="text-xs font-bold tracking-[.3em] text-[#ffdd8a]">SUNRISECABS</a>
        <a href="/#fleet" className="rounded-full border border-[#f4b942]/30 bg-black/40 px-5 py-3 text-[10px] uppercase tracking-widest backdrop-blur-xl">Back to fleet</a>
      </header>
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,185,66,.17),transparent_28%),linear-gradient(#030303,#080806)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(transparent,rgba(244,185,66,.045))]" />
        <Canvas shadows dpr={[1,2]} camera={{position:[0,1.1,6.4],fov:38}}>
          <PerspectiveCamera makeDefault position={[0,1.1,6.4]} />
          <ambientLight intensity={0.35} />
          <spotLight position={[3,5,4]} intensity={55} angle={0.38} penumbra={1} color="#ffdf9a" castShadow />
          <pointLight position={[-4,1,2]} intensity={16} color="#f4b942" />
          <Environment preset="night" />
          <VehicleSilhouette />
          <Sparkles count={90} scale={[8,4,6]} size={1.3} speed={0.25} color="#ffdd8a" />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-6xl px-6 md:bottom-14">
          <p className="text-[9px] uppercase tracking-[.4em] text-[#ffdd8a]">03 / Interactive vehicle studio</p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h1 className="font-serif text-5xl leading-none md:text-8xl">Feel the<br/><em className="text-[#ffe09a]">drive.</em></h1>
            <p className="max-w-sm text-sm leading-6 text-white/45">A lightweight WebGL automotive experience for SunriseCabs. The showroom model is intentionally stylized until a licensed exact vehicle model is available.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
