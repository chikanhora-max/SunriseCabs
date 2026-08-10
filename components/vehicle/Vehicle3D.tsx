'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type VehicleKind = 'hatch' | 'suv' | 'van' | 'sedan';
let instanceSequence = 0;

function Body({ kind }: { kind: VehicleKind }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.06; });
  const spec = { hatch:{w:2.2,l:3.9,roof:.74,cabin:.50}, suv:{w:2.52,l:4.5,roof:.78,cabin:.54}, sedan:{w:2.38,l:4.7,roof:.72,cabin:.52}, van:{w:2.78,l:5.05,roof:.84,cabin:.72} }[kind];
  const {w,l,roof,cabin}=spec; const wheelX=w*.48; const wheelZ=l*.32;
  return <group ref={group} position={[0,.18,0]}>
    <RoundedBox args={[w,.48,l]} radius={.16} smoothness={6} position={[0,.58,0]}><meshPhysicalMaterial color="#f7f7f4" metalness={.7} roughness={.19} clearcoat={1} clearcoatRoughness={.08}/></RoundedBox>
    <RoundedBox args={[w*.84,roof,l*cabin]} radius={.13} smoothness={6} position={[0,.98,kind==='van' ? -.08:.14]}><meshPhysicalMaterial color="#eeeeeb" metalness={.48} roughness={.22} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w*.68,.5,l*cabin*.82]} radius={.07} smoothness={5} position={[0,1.04,.18]}><meshPhysicalMaterial color="#151719" metalness={.28} roughness={.1} transmission={.04} clearcoat={1}/></RoundedBox>
    <RoundedBox args={[w*.32,.12,.08]} radius={.025} smoothness={3} position={[0,.64,l/2+.03]}><meshStandardMaterial color="#17191b" metalness={.8} roughness={.22}/></RoundedBox>
    {[-1,1].map(side=><mesh key={side} position={[side*w*.28,.7,l/2+.035]}><boxGeometry args={[w*.2,.075,.035]}/><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.2}/></mesh>)}
    {[-1,1].map(side=><RoundedBox key={side} args={[.16,.1,.22]} radius={.03} smoothness={3} position={[side*(w*.52),1.02,.48]}><meshStandardMaterial color="#17191b" metalness={.7} roughness={.18}/></RoundedBox>)}
    {[-1,1].map(side=>[-1,1].map(zSide=><group key={`${side}-${zSide}`} position={[side*wheelX,.39,zSide*wheelZ]} rotation={[Math.PI/2,0,0]}><mesh><cylinderGeometry args={[.3,.3,.16,32]}/><meshStandardMaterial color="#111214" metalness={.82} roughness={.22}/></mesh><mesh position={[0,.09,0]}><cylinderGeometry args={[.13,.13,.17,24]}/><meshStandardMaterial color="#b8b8b3" metalness={.85} roughness={.18}/></mesh></group>))}
    <mesh position={[0,.73,0]}><boxGeometry args={[w*.9,.018,l*.78]}/><meshStandardMaterial color="#cfcfca" metalness={.2} roughness={.4}/></mesh>
  </group>;
}

function FleetFallback({kind}:{kind:VehicleKind}) {
  const widths={hatch:'72%',suv:'82%',sedan:'78%',van:'88%'};
  return <div className="fleet-3d-fallback" aria-label={`${kind} vehicle preview`}><div className="fallback-car" style={{width:widths[kind]}}><span/><i/><b/></div><div className="fallback-shadow"/></div>;
}

export default function Vehicle3D({kind='hatch'}:{kind?:VehicleKind}) {
  const [slot]=useState(()=>instanceSequence++);
  if(slot>1) return <div className="vehicle-3d" aria-label="Vehicle preview"><FleetFallback kind={kind}/><style>{`.fleet-3d-fallback{position:relative;width:100%;height:100%;min-height:220px;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 42%,#fff 0,#efefec 58%,#e7e7e3 100%)}.fallback-car{height:23%;min-height:58px;position:relative;border-radius:24% 28% 13% 13%;background:linear-gradient(#fafaf8,#d9d9d4);border:1px solid #c6c6c0;box-shadow:0 20px 35px rgba(0,0,0,.12);transform:perspective(500px) rotateX(3deg)}.fallback-car:before{content:"";position:absolute;left:16%;right:16%;top:-48%;height:70%;border-radius:48% 48% 15% 15%;background:linear-gradient(145deg,#26292b,#0e1012);border:5px solid #e5e5e1;box-shadow:inset 0 0 0 1px #444}.fallback-car:after{content:"";position:absolute;left:7%;right:7%;bottom:14%;height:2px;background:#aaa}.fallback-car span,.fallback-car i{position:absolute;width:14%;height:24%;bottom:-10%;background:#111;border-radius:45%;box-shadow:inset 0 0 0 5px #aaa}.fallback-car span{left:9%}.fallback-car i{right:9%}.fallback-car b{position:absolute;right:7%;top:24%;width:10%;height:9%;background:#fff;box-shadow:0 0 10px #fff}.fallback-shadow{position:absolute;bottom:22%;width:58%;height:5%;border-radius:50%;background:rgba(0,0,0,.16);filter:blur(10px)}.sunrise-site h1,.sunrise-site h2,.sunrise-site h3,.sunrise-site .manifesto-title,.sunrise-site .footer-title,.sunrise-site .footer-brand{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:500;letter-spacing:-.07em}.sunrise-site h1 em,.sunrise-site h2 em,.sunrise-site .manifesto-title em,.sunrise-site .footer-title em,.sunrise-site .footer-brand em{font-style:italic;font-weight:400}`}</style></div>;
  return <div className="vehicle-3d" aria-label="Interactive 3D vehicle showcase"><Canvas dpr={[1,1.5]} camera={{position:[5.4,2.55,6.4],fov:34}} gl={{antialias:true,powerPreference:'high-performance',alpha:false}}><color attach="background" args={['#f7f7f5']}/><ambientLight intensity={1.4}/><hemisphereLight args={['#fff','#d4d4ce',1.1]}/><directionalLight position={[4,6,5]} intensity={4.5}/><directionalLight position={[-5,3,-2]} intensity={2.2}/><spotLight position={[0,7,3]} angle={.55} penumbra={.8} intensity={4}/><Body kind={kind}/><ContactShadows position={[0,.02,0]} opacity={.24} scale={8} blur={2.7} far={6}/><Environment preset="studio"/><OrbitControls enablePan={false} minDistance={4.7} maxDistance={8.5} minPolarAngle={Math.PI/3.1} maxPolarAngle={Math.PI/2.05} autoRotate autoRotateSpeed={.55}/></Canvas></div>;
}
