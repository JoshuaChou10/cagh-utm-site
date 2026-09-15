"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const nodes = [
  [43.55, -79.66], [51.05, -114.07], [40.71, -74.01], [51.51, -0.13],
  [6.52, 3.38], [28.61, 77.21], [1.35, 103.82], [-33.87, 151.21], [-23.55, -46.63]
];

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
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.08; });
  return (
    <group ref={group} rotation={[0.15, -0.4, 0]}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial color="#dceefa" transparent opacity={0.32} roughness={0.15} metalness={0.05} transmission={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.01, 32, 18]} />
        <meshBasicMaterial color="#2D6CA2" wireframe transparent opacity={0.16} />
      </mesh>
      {nodes.map(([lat, lng], i) => {
        const p = latLngToVec3(lat, lng, 2.06);
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[i === 0 ? 0.065 : 0.045, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? "#002A5C" : "#74B6E6"} />
          </mesh>
        );
      })}
      {nodes.slice(1).map((n, i) => <Arc key={i} a={nodes[0] as [number, number]} b={n as [number, number]} />)}
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
