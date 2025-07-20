'use client';
import React from 'react';

type Particle = {
  left: number;
  top: number;
  delay: number;
  duration: number;
};

export default function ParticleField({ particles }: { particles: Particle[] }) {
  return (
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
}
