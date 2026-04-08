import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function WavyBackground() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 - 2;
      meshRef.current.rotation.x = -Math.PI / 2 + Math.cos(state.clock.elapsedTime * 0.4) * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <MeshDistortMaterial
        color="#FACC15"
        emissive="#EAB308"
        emissiveIntensity={0.8}
        speed={2.2}
        distort={0.45}
        radius={1}
        roughness={0.1}
        metalness={0.6}
      />
    </mesh>
  );
}

function FloatingDroplets() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={2} rotationIntensity={1}>
          <mesh 
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10 + 2,
              (Math.random() - 0.5) * 10 - 2
            ]}
          >
            <sphereGeometry args={[0.1 + Math.random() * 0.2, 32, 32]} />
            <meshStandardMaterial 
              color="#FDE047" 
              emissive="#EAB308"
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function LoginScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Luces sutiles */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 10, 5]} intensity={1.5} color="#FDE047" />
        
        {/* Un brillo amarillo desde abajo para el horizonte */}
        <pointLight position={[0, -5, 0]} intensity={5} color="#EAB308" distance={20} />

        <WavyBackground />
        <FloatingDroplets />

        {/* Partículas tenues y distantes */}
        <Sparkles count={100} scale={20} size={1} speed={0.2} opacity={0.3} color="#FEF08A" />
      </Canvas>
    </div>
  );
}
