'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
type VehicleKind='hatch'|'suv'|'van'|'sedan';
function RentalVehicle({kind}:{kind:VehicleKind}){
 const group=useRef<THREE.Group>(null);
 const spec={
  hatch:{body:[2.35,.62,1.05] as [number,number,number],cabin:[1.48,.62,.92] as [number,number,number],cabinY:.58,wheel:.32},
  sedan:{body:[2.72,.58,1.08] as [number,number,number],cabin:[1.72,.48,.94] as [number,number,number],cabinY:.58,wheel:.33},
  suv:{body:[2.52,.74,1.14] as [number,number,number],cabin:[1.62,.62,1] as [number,number,number],cabinY:.67,wheel:.35},
  van:{body:[2.78,.82,1.18] as [number,number,number],cabin:[1.95,.68,1.06] as [number,number,number],cabinY:.72,wheel:.36}
 }[kind];
 useFrame((_,d)=>{if(group.current)group.current.rotation.y+=d*.12});
 const wheelX=spec.body[0]/2-.42;
 return <group ref={group} position={[0,.58,0]}>
  <RoundedBox args={spec.body} radius={.12} smoothness={4} castShadow receiveShadow><meshStandardMaterial color="#d8d8d4" metalness={.58} roughness={.26}/></RoundedBox>
  <RoundedBox args={spec.cabin} radius={.1} smoothness={4} position={[.08,spec.cabinY,0]} castShadow><meshStandardMaterial color="#202326" metalness={.18} roughness={.18}/></RoundedBox>
  <RoundedBox args={[spec.cabin[0]*.78,.36,spec.body[2]+.012]} radius={.06} smoothness={3} position={[.08,spec.cabinY+.03,0]}><meshStandardMaterial color="#b8c3c8" metalness={.1} roughness={.12} transparent opacity={.72}/></RoundedBox>
  {[-1,1].flatMap(side=>[-1,1].map(axle=><group key={`${side}-${axle}`} position={[axle*wheelX,-.38,side*(spec.body[2]/2+.025)]} rotation={[Math.PI/2,0,0]}><mesh castShadow><cylinderGeometry args={[spec.wheel,.34,.17,28]}/><meshStandardMaterial color="#111" metalness={.72} roughness={.2}/></mesh><mesh position={[0,0,.09]}><cylinderGeometry args={[spec.wheel*.45,spec.wheel*.45,.02,20]}/><meshStandardMaterial color="#d6d6d2" metalness={.75} roughness={.18}/></mesh></group>))}
  <RoundedBox args={[.08,.14,spec.body[2]*.56]} radius={.02} smoothness={2} position={[spec.body[0]/2+.01,-.02,0]}><meshStandardMaterial color="#f8f8f5" emissive="#ffffff" emissiveIntensity={1.2}/></RoundedBox>
  <RoundedBox args={[.08,.13,spec.body[2]*.48]} radius={.02} smoothness={2} position={[-spec.body[0]/2-.01,-.02,0]}><meshStandardMaterial color="#681616" emissive="#250000" emissiveIntensity={.6}/></RoundedBox>
  <RoundedBox args={[.34,.12,.12]} radius={.03} smoothness={2} position={[spec.body[0]/2-.14,.04,.0]}><meshStandardMaterial color="#161616" metalness={.5}/></RoundedBox>
 </group>;
}
export default function Vehicle3D({kind='hatch'}:{kind?:VehicleKind}){return <div className="vehicle-3d" aria-label={`${kind} rental vehicle 3D visualization`}><Canvas dpr={[1,1.35]} camera={{position:[4.6,2.15,5.6],fov:35}} gl={{antialias:true,powerPreference:'high-performance',alpha:false}} shadows><color attach="background" args={['#f7f7f4']}/><ambientLight intensity={1.15}/><hemisphereLight args={['#fff','#c9c9c4',1.05]}/><directionalLight position={[4,6,5]} intensity={3.1} castShadow shadow-mapSize={[512,512]}/><directionalLight position={[-4,2,-3]} intensity={1.7}/><RentalVehicle kind={kind}/><ContactShadows position={[0,.01,0]} opacity={.28} scale={6} blur={2.5} far={6}/><Environment preset="studio"/><OrbitControls enablePan={false} minDistance={4.3} maxDistance={7.6} minPolarAngle={Math.PI/3.2} maxPolarAngle={Math.PI/2.03} autoRotate autoRotateSpeed={.28} enableDamping dampingFactor={.08}/></Canvas></div>}
