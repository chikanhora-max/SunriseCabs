'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

type VehicleKind = 'hatch' | 'suv' | 'van' | 'sedan';

function Body({ kind }: { kind: VehicleKind }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.06; });
  const spec = {
    hatch: { w: 2.2, l: 3.9, roof: 0.74, cabin: 0.50 },
    suv: { w: 2.52, l: 4.5, roof: 0.78, cabin: 0.54 },
    sedan: { w: 2.38, l: 4.7, roof: 0.72, cabin: 0.52 },
    van: { w: 2.78, l: 5.05, roof: 0.84, cabin: 0.72 },
  }[kind];
  const { w, l, roof, cabin } = spec;
  const wheelX = w * 0.48;
  const wheelZ = l * 0.32;
  return <group ref={group} position={[0, 0.18, 0]}>
    <RoundedBox args={[w, 0.48, l]} radius={0.16} smoothness={6} position={[0, 0.58, 0]}><meshPhysicalMaterial color="#f7f7f4" metalness={0.7} roughness={0.19} clearcoat={1} clearcoatRoughness={0.08}/></RoundedBox>
    <RoundedBox args={[w * 0.84, roof, l * cabin]} radius={0.13} smoothness={6} position={[0, 0.98, kind === 'van' ? -0.08 : 0.14]}><meshPhysicalMaterial color="#eeeeeb" metalness={0.48} roughness={0.22} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w * 0.68, 0.5, l * cabin * 0.82]} radius={0.07} smoothness={5} position={[0, 1.04, 0.18]}><meshPhysicalMaterial color="#151719" metalness={0.28} roughness={0.1} transmission={0.04} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w * 0.32, 0.12, 0.08]} radius={0.025} smoothness={3} position={[0, 0.64, l / 2 + 0.03]}><meshStandardMaterial color="#17191b" metalness={0.8} roughness={0.22}/></RoundedBox>
    {[-1, 1].map(side => <mesh key={side} position={[side * w * 0.28, 0.7, l / 2 + 0.035]}><boxGeometry args={[w * 0.2, 0.075, 0.035]}/><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.2}/></mesh>)}
    {[-1, 1].map(side => <RoundedBox key={side} args={[0.16, 0.1, 0.22]} radius={0.03} smoothness={3} position={[side * (w * 0.52), 1.02, 0.48]}><meshStandardMaterial color="#17191b" metalness={0.7} roughness={0.18}/></RoundedBox>)}
    {[-1, 1].map(side => [-1, 1].map(zSide => <group key={`${side}-${zSide}`} position={[side * wheelX, 0.39, zSide * wheelZ]} rotation={[Math.PI / 2, 0, 0]}><mesh><cylinderGeometry args={[0.3, 0.3, 0.16, 32]}/><meshStandardMaterial color="#111214" metalness={0.82} roughness={0.22}/></mesh><mesh position={[0, 0.09, 0]}><cylinderGeometry args={[0.13, 0.13, 0.17, 24]}/><meshStandardMaterial color="#b8b8b3" metalness={0.85} roughness={0.18}/></mesh></group>))}
    <mesh position={[0, 0.73, 0]}><boxGeometry args={[w * 0.9, 0.018, l * 0.78]}/><meshStandardMaterial color="#cfcfca" metalness={0.2} roughness={0.4}/></mesh>
  </group>;
}

export default function Vehicle3D({ kind = 'hatch' }: { kind?: VehicleKind }) {
  return <div className="vehicle-3d" aria-label="Interactive 3D vehicle showcase">
    <Canvas dpr={[1, 1.5]} camera={{ position: [5.4, 2.55, 6.4], fov: 34 }} gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}>
      <color attach="background" args={['#f7f7f5']}/>
      <ambientLight intensity={1.4}/><hemisphereLight args={['#fff','#d4d4ce',1.1]}/><directionalLight position={[4,6,5]} intensity={4.5}/><directionalLight position={[-5,3,-2]} intensity={2.2}/><spotLight position={[0,7,3]} angle={0.55} penumbra={0.8} intensity={4}/>
      <Body kind={kind}/><ContactShadows position={[0,0.02,0]} opacity={0.24} scale={8} blur={2.7} far={6}/><Environment preset="studio"/>
      <OrbitControls enablePan={false} minDistance={4.7} maxDistance={8.5} minPolarAngle={Math.PI/3.1} maxPolarAngle={Math.PI/2.05} autoRotate autoRotateSpeed={0.55}/>
    </Canvas>
  </div>;
}
