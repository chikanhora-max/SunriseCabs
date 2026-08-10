'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls, RoundedBox, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

type VehicleKind = 'hatch' | 'suv' | 'van' | 'sedan';

function Car({ kind }: { kind: VehicleKind }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.08; });
  const dimensions = kind === 'van' ? [2.8, 1.45, 5.0] : kind === 'suv' ? [2.5, 1.35, 4.45] : kind === 'sedan' ? [2.35, 1.18, 4.65] : [2.15, 1.25, 3.8];
  const [w,h,l] = dimensions;
  return <group ref={group} position={[0, .15, 0]}>
    <RoundedBox args={[w, .62, l]} radius={.16} smoothness={5} position={[0, .5, 0]}><meshPhysicalMaterial color="#f4f4f2" metalness={.75} roughness={.2} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w*.78, .72, l*.5]} radius={.16} smoothness={5} position={[0, 1.02, kind === 'van' ? -.05 : .18]}><meshPhysicalMaterial color="#e9e9e7" metalness={.4} roughness={.22} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w*.58, .48, l*.42]} radius={.08} smoothness={4} position={[0, 1.08, .22]}><meshPhysicalMaterial color="#121417" metalness={.2} roughness={.08} transmission={.05}/></RoundedBox>
    {[-w*.44,w*.44].map((x)=><group key={x}>{[-l*.31,l*.31].map(z=><mesh key={z} position={[x,.34,z]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.27,.27,.14,24]}/><meshStandardMaterial color="#111" metalness={.8} roughness={.25}/></mesh>)}</group>)}
    <mesh position={[0,.63,l/2+.01]}><boxGeometry args={[w*.42,.14,.04]}/><meshStandardMaterial color="#f8f8f5" emissive="#ffffff" emissiveIntensity={1.5}/></mesh>
  </group>;
}

export default function Vehicle3D({ kind='hatch' }: { kind?: VehicleKind }) {
  return <div className="vehicle-3d" aria-label="Interactive 3D vehicle showcase">
    <Canvas dpr={[1,1.5]} camera={{position:[5,2.6,6.2],fov:35}} gl={{antialias:true,powerPreference:'high-performance'}}>
      <color attach="background" args={['#f7f7f5']} />
      <ambientLight intensity={1.6}/><directionalLight position={[4,6,5]} intensity={4}/><directionalLight position={[-4,2,-3]} intensity={2}/>
      <Float speed={1.2} rotationIntensity={.12} floatIntensity={.15}><Car kind={kind}/></Float>
      <ContactShadows position={[0,0,0]} opacity={.22} scale={8} blur={2.5} far={5}/>
      <Environment preset="studio"/>
      <OrbitControls enablePan={false} minDistance={4.8} maxDistance={8} minPolarAngle={Math.PI/3.2} maxPolarAngle={Math.PI/2.05} autoRotate autoRotateSpeed={.5}/>
    </Canvas>
  </div>;
}
