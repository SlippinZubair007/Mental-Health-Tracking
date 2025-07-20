'use client';

import { useState, useEffect, useRef } from 'react';
import ParticleField from './ParticleField';
import NeuroGrid from './NeuroGrid';

type Particle = {
  left: number;
  top: number;
  delay: number;
  duration: number;
};

export default function FuturisticBG({ children }: { children?: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-hidden relative" // removed bg-black
    >
      <ParticleField particles={particles} />
      <NeuroGrid />

      {/* Orbiting Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: `radial-gradient(circle,
                rgba(40, 0, 90, ${0.25 + i * 0.05}) 0%,
                rgba(10, 0, 50, ${0.12 + i * 0.03}) 30%,
                transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i * 2}s`,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
}
