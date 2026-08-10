'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
type VehicleKind = 'hatch' | 'suv' | 'van' | 'sedan';
function RentalVehicle({ kind }: { kind: VehicleKind }) {
 const group=useRef<THREE.Group>(null); const body: [number,number,number]=kind==='van'?[2.65,.82,1.18]:kind==='suv'?[2.45,.72,1.14]:kind==='sedan'?[2.7,.6,1.08]:[2.3,.62,1.04]; const cabin: [number,number,number]=kind==='van'?[1.72,.62,1.04]:kind==='suv'?[1.62,.58,1]:kind==='sedan'?[1.75,.5,.94]:[1.5,.52,.9];
 useFrame((_,d)=>{if(group.current)group.current.rotation.y+=d*.16}); return <group ref={group} position={[0,.62,0]}>
  <mesh castShadow receiveShadow><boxGeometry args={body}/><meshStandardMaterial color="#d9d9d5" metalness={.62} roughness={.24}/></mesh>
  <mesh castShadow position={[.1,.62,0]}><boxGeometry args={cabin}/><meshStandardMaterial color="#202124" metalness={.25} roughness={.16}/></mesh>
  <mesh position={[.1,.62,.525]}><boxGeometry args={[cabin[0]*.78,cabin[1]*.66,.018]}/><meshStandardMaterial color="#cfd8dc" roughness={.08} transparent opacity={.72}/></mesh>
  {[-1,1].flatMap(side=>[-1,1].map(axle=><mesh key={`${side}-${axle}`} castShadow rotation={[Math.PI/2,0,0]} position={[axle*(body[0]/2-.38),-.45,side*(body[2]/2+.02)]}><cylinderGeometry args={[.34,.34,.16,32]}/><meshStandardMaterial color="#111" metalness={.72} roughness={.2}/></mesh>))}
  <mesh position={[body[0]/2+.02,-.03,0]}><boxGeometry args={[.05,.18,body[2]*.55]}/><meshStandardMaterial color="#f5f5f5" emissive="#fff" emissiveIntensity={1.5}/></mesh>
  <mesh position={[-body[0]/2-.02,-.03,0]}><boxGeometry args={[.05,.16,body[2]*.45]}/><meshStandardMaterial color="#6d1010" emissive="#3a0000" emissiveIntensity={.7}/></mesh>
 </group>;
}
export default function Vehicle3D({kind='hatch'}:{kind?:VehicleKind}){return <div className="vehicle-3d" aria-label={`${kind} rental vehicle 3D visualization`}><Canvas dpr={[1,1.35]} camera={{position:[4.8,2.25,5.8],fov:35}} gl={{antialias:true,powerPreference:'high-performance',alpha:false}} shadows><color attach="background" args={['#f7f7f4']}/><ambientLight intensity={1.2}/><hemisphereLight args={['#fff','#c9c9c4',1.1]}/><directionalLight position={[4,6,5]} intensity={3.4} castShadow shadow-mapSize={[512,512]}/><directionalLight position={[-4,2,-3]} intensity={1.8}/><RentalVehicle kind={kind}/><ContactShadows position={[0,.02,0]} opacity={.3} scale={6} blur={2.4} far={6}/><Environment preset="studio"/><OrbitControls enablePan={false} minDistance={4.4} maxDistance={7.8} minPolarAngle={Math.PI/3.2} maxPolarAngle={Math.PI/2.03} enableDamping dampingFactor={.08}/></Canvas></div>}
