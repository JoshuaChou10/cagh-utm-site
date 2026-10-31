"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

// Hoist static datasets outside the component loop
const nodes = [
  [43.55, -79.66], [51.05, -114.07], [40.71, -74.01], [51.51, -0.13],
  [6.52, 3.38], [28.61, 77.21], [1.35, 103.82], [-33.87, 151.21], [-23.55, -46.63]
];

// Pre-allocate reusable single-instance Geometries and Materials globally
const SPHERE_GLO_GEOM = new THREE.SphereGeometry(2, 64, 64);
const WIRE_GLO_GEOM = new THREE.SphereGeometry(2.01, 32, 18);
const NODE_GEOM = new THREE.SphereGeometry(0.045, 16, 16);
const CENTER_NODE_GEOM = new THREE.SphereGeometry(0.065, 16, 16);

const EARTH_MAT = new THREE.MeshPhysicalMaterial({ color: "#dceefa", transparent: true, opacity: 0.32, roughness: 0.15, metalness: 0.05, transmission: 0.15 });
const WIRE_MAT = new THREE.MeshBasicMaterial({ color: "#2D6CA2", wireframe: true, transparent: true, opacity: 0.16 });
const NODE_MAT = new THREE.MeshBasicMaterial({ color: "#74B6E6" });
const CENTER_NODE_MAT = new THREE.MeshBasicMaterial({ color: "#002A5C" });

function latLngToVec3(lat: number, lng: number, radius = 2.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Arc({ a, b }: { a: [number, number]; b: [number, number] }) {
  const points = useMemo(() => {
    const start = latLngToVec3(...a);
    const end = latLngToVec3(...b);
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.75);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(40);
  }, [a, b]);

  return <Line points={points} color="#74B6E6" transparent opacity={0.52} lineWidth={0.8} />;
}

function World() {
  const group = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((_, delta) => { 
    if (group.current) group.current.rotation.y += delta * 0.08; 
  });

  // Batch transform operations for the secondary nodes via InstancedMesh
  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();
    // Start loop at index 1 because index 0 is our distinct center hub node
    for (let i = 1; i < nodes.length; i++) {
      const [lat, lng] = nodes[i];
      const p = latLngToVec3(lat, lng, 2.06);
      
      dummy.position.copy(p);
      dummy.updateMatrix();
      // Set the transform matrix for each instance inside our single WebGL draw batch
      instancedMeshRef.current.setMatrixAt(i - 1, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  // Compute arcs safely with useMemo
  const arcs = useMemo(() => {
    return nodes.slice(1).map((n, i) => (
      <Arc key={i} a={nodes[0] as [number, number]} b={n as [number, number]} />
    ));
  }, []);

  // Isolate the focal/hub node position
  const centerNodePos = useMemo(() => latLngToVec3(nodes[0][0], nodes[0][1], 2.06), []);

  return (
    <group ref={group} rotation={[0.15, -0.4, 0]}>
      {/* Reusing shared global geometry and material configurations */}
      <mesh geometry={SPHERE_GLO_GEOM} material={EARTH_MAT} />
      <mesh geometry={WIRE_GLO_GEOM} material={WIRE_MAT} />

      {/* Render the unique root hub independently */}
      <mesh position={centerNodePos} geometry={CENTER_NODE_GEOM} material={CENTER_NODE_MAT} />

      {/* Render all 8 secondary nodes using a single WebGL Draw Batch */}
      <instancedMesh 
        ref={instancedMeshRef} 
        args={[NODE_GEOM, NODE_MAT, nodes.length - 1]} 
      />

      {arcs}
    </group>
  );
}

export function Globe() {
  return (
    <div className="h-[420px] w-full md:h-[560px]" aria-label="Interactive global health network globe">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.6]}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 3, 5]} intensity={2} />
        <World />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
