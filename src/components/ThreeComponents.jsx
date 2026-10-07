import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Media query hook to respect user prefers-reduced-motion settings
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);

    const listener = (event) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return reduced;
}

// 1. Starfield3D - Slow drifting particles behind content
function StarfieldParticles({ reducedMotion }) {
  const pointsRef = useRef();
  const count = 2500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a large 3D sphere
      const radius = 25 + Math.random() * 25;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  // Parallax tracking
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      if (!reducedMotion) {
        // Slow auto-rotation
        pointsRef.current.rotation.y += 0.0003;
        pointsRef.current.rotation.x += 0.0001;

        // Smooth mouse parallax lerp
        const targetX = mouse.current.x * 1.5;
        const targetY = -mouse.current.y * 1.5;
        pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
        pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#475569"
        size={0.09}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.18}
        depthWrite={false}
      />
    </points>
  );
}

export function Starfield3D() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 60 }} 
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
        style={{ pointerEvents: 'none' }}
      >
        <StarfieldParticles reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

// 2. TechOrbit3D - Tech stacks orbiting a central core
function TechOrbitScene({ reducedMotion }) {
  const groupRef = useRef();
  
  const techItems = [
    { name: 'React', color: '#2563EB' },      // Signal Blue
    { name: 'Next.js', color: '#D97706' },    // Copper / Amber
    { name: 'JS', color: '#2563EB' },         // Signal Blue
    { name: 'TS', color: '#D97706' },         // Copper / Amber
    { name: 'Node', color: '#2563EB' },       // Signal Blue
    { name: 'Python', color: '#D97706' },     // Copper / Amber
    { name: 'Docker', color: '#2563EB' },     // Signal Blue
    { name: 'AWS', color: '#D97706' }         // Copper / Amber
  ];

  const orbitRadius = 2.4;
  const nodes = useMemo(() => {
    return techItems.map((item, idx) => {
      // Uniform spherical distribution of coordinates
      const phi = Math.acos(-1 + (2 * idx) / techItems.length);
      const theta = Math.sqrt(techItems.length * Math.PI) * phi;
      
      return {
        name: item.name,
        color: item.color,
        x: orbitRadius * Math.sin(phi) * Math.cos(theta),
        y: orbitRadius * Math.sin(phi) * Math.sin(theta),
        z: orbitRadius * Math.cos(phi),
        floatSeed: Math.random() * 10
      };
    });
  }, []);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      if (!reducedMotion) {
        // Continuous rotation on Y-axis
        groupRef.current.rotation.y += 0.005;

        // Smooth mouse pitch/yaw tilt (capped and lerped)
        const targetTiltX = mouse.current.y * 0.25; // Cap at 0.25 rad (~14 deg)
        const targetTiltZ = mouse.current.x * 0.25;
        
        groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.z += (targetTiltZ - groupRef.current.rotation.z) * 0.05;
      } else {
        // Static centering if reduced motion is active
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.y = 0;
        groupRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Wireframe Icosahedron Core */}
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#64748B" wireframe={true} transparent={true} opacity={0.15} />
      </mesh>
      <mesh scale={0.96}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#94A3B8" wireframe={true} transparent={true} opacity={0.08} />
      </mesh>

      {/* Orbiting nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={[node.x, node.y, node.z]}>
          <Float 
            speed={reducedMotion ? 0 : 1.5} 
            rotationIntensity={reducedMotion ? 0 : 0.15} 
            floatIntensity={reducedMotion ? 0 : 0.4}
            floatingRange={[-0.1, 0.1]}
          >
            {/* Small glowing sphere */}
            <mesh>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial 
                color={node.color} 
                emissive={node.color} 
                emissiveIntensity={0.9} 
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            {/* Floating HTML label above */}
            <Html distanceFactor={6} position={[0, 0.28, 0]} center zIndexRange={[10, 20]}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-800 bg-white/95 px-1.5 py-0.5 rounded border border-slate-200/80 whitespace-nowrap shadow-md pointer-events-none select-none">
                {node.name}
              </div>
            </Html>
          </Float>
        </group>
      ))}
    </group>
  );
}

export function TechOrbit3D() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F2F0EB" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5E8FCC" />
        <TechOrbitScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

// 3. SecurityLock3D - Padlock made from primitive shapes
function LockMesh({ reducedMotion }) {
  const lockRef = useRef();

  useFrame(() => {
    if (!reducedMotion && lockRef.current) {
      // Continuous slow rotation on Y-axis
      lockRef.current.rotation.y += 0.012;
    }
  });

  return (
    <group ref={lockRef}>
      {/* Shackle (Torus) */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.38, 0.08, 16, 48]} />
        <meshStandardMaterial 
          color="#64748B" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#64748B"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Lock Body (Box) */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.95, 0.8, 0.4]} />
        <meshStandardMaterial 
          color="#D97706" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#D97706"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Keyhole Accent (Cylinder) */}
      <mesh position={[0, -0.15, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial 
          color="#2563EB" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#2563EB"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Keyhole Key Slot (Box) */}
      <mesh position={[0, -0.18, 0.22]}>
        <boxGeometry args={[0.04, 0.1, 0.02]} />
        <meshStandardMaterial color="#0F172A" roughness={1.0} metalness={0.0} />
      </mesh>

      {/* Keyhole Upper Dot (Sphere) */}
      <mesh position={[0, -0.12, 0.22]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#0F172A" roughness={1.0} metalness={0.0} />
      </mesh>
    </group>
  );
}

export function SecurityLock3D() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 2.5], fov: 40 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.65} />
        {/* Soft rim lights from two opposite angles */}
        <pointLight position={[-4, 2, 3]} intensity={2.5} color="#D97706" />
        <pointLight position={[4, -2, 3]} intensity={2.5} color="#2563EB" />
        <LockMesh reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
