'use client';
import React from 'react';

export default function NeuroGrid() {
  return (
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
}
