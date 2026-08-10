'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type VehicleKind = 'hatch' | 'suv' | 'van' | 'sedan';
let instanceSequence = 0;

// A real GLB concept-car asset is used for the studio stage rather than primitive boxes.
// It is intentionally labelled as a concept visualization in the UI, not as an exact Sunrise fleet vehicle.
const CONCEPT_CAR = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CarConcept/glTF-Binary/CarConcept.glb';

function Model({ kind }: { kind: VehicleKind }) {
  const { scene } = useGLTF(CONCEPT_CAR);
  const root = useRef<THREE.Group>(null);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const target = kind === 'van' ? 4.7 : kind === 'suv' ? 4.4 : kind === 'sedan' ? 4.5 : 4.1;
    const scale = target / Math.max(size.x, size.z);
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (material?.isMeshStandardMaterial) {
        material.roughness = Math.min(material.roughness ?? 0.35, 0.32);
        material.metalness = Math.max(material.metalness ?? 0.25, 0.35);
      }
    });
  }, [clone, kind]);

  return <group ref={root} rotation={[0, -0.42, 0]} position={[0, 0.02, 0]}><primitive object={clone} /></group>;
}

function StudioModel({ kind }: { kind: VehicleKind }) {
  const ref = useRef<THREE.Group>(null);
  return <group ref={ref}><Model kind={kind} /></group>;
}

function Fallback({ kind }: { kind: VehicleKind }) {
  return <div className="fleet-3d-fallback" aria-label={`${kind} vehicle concept preview`}><div className="fallback-car"/><div className="fallback-shadow"/><span className="fallback-label">3D CONCEPT</span></div>;
}

function Scene({ kind }: { kind: VehicleKind }) {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [5.5, 2.45, 6.5], fov: 33 }} gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }} shadows>
    <color attach="background" args={['#f6f6f3']} />
    <ambientLight intensity={1.25} />
    <hemisphereLight args={['#ffffff', '#d2d2cc', 1.25]} />
    <directionalLight position={[4, 6, 5]} intensity={4.8} castShadow shadow-mapSize={[1024, 1024]} />
    <directionalLight position={[-4, 3, -3]} intensity={2.2} />
    <spotLight position={[0, 6, 4]} angle={0.55} penumbra={0.9} intensity={4.5} />
    <Suspense fallback={null}><StudioModel kind={kind} /></Suspense>
    <ContactShadows position={[0, 0.01, 0]} opacity={0.28} scale={7} blur={2.6} far={6} />
    <Environment preset="studio" />
    <OrbitControls enablePan={false} minDistance={4.7} maxDistance={8.5} minPolarAngle={Math.PI / 3.1} maxPolarAngle={Math.PI / 2.05} autoRotate autoRotateSpeed={0.48} enableDamping dampingFactor={0.08} />
  </Canvas>;
}

export default function Vehicle3D({ kind = 'hatch' }: { kind?: VehicleKind }) {
  const [slot] = useRef([instanceSequence++]).current;
  if (slot > 1) return <div className="vehicle-3d" aria-label="Vehicle preview"><Fallback kind={kind} /></div>;
  return <div className="vehicle-3d" aria-label="Interactive 3D vehicle concept showcase"><Scene kind={kind} /></div>;
}

useGLTF.preload(CONCEPT_CAR);
