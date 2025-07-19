'use client';

import { useState, useEffect, useRef } from 'react';

type Particle = {
  left: number;
  top: number;
  delay: number;
  duration: number;
};

export default function FuturisticMentalHealthTrackerBG() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // generate particle data only on client
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

  const ParticleField = () => (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );

  const NeuroGrid = () => (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <svg width="100%" height="100%" className="absolute">
        <defs>
          <pattern
            id="neurogrid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="2" fill="url(#neonGradient)" opacity="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="url(#neonGradient)" strokeWidth="0.5" opacity="0.3" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="url(#neonGradient)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#0080ff" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#neurogrid)" />
      </svg>
    </div>
  );

  return (
    <div
  ref={containerRef}
  className="min-h-screen bg-black overflow-hidden relative"
  style={{
     background: `linear-gradient(135deg, rgba(5, 10, 30, 0.95) 0%, rgba(0, 0, 0, 1) 100%)`,
     backgroundColor: '#0a0a0f',
  }}
>

      <ParticleField />
      <NeuroGrid />

      {/* Dark-toned Orbiting Orbs */}
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
    </div>
  );
}
