'use client';

import { useState, useEffect, useRef } from 'react';

export default function FuturisticMentalHealthTracker() {
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [cardsVisible, setCardsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBreathing, setIsBreathing] = useState(false);
  const [aiInsights, setAiInsights] = useState(3);
  const [wellness, setWellness] = useState(78);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsVisible(true);
    }, 200);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const selectMood = (mood: string) => {
    setSelectedMood(mood);
    // Simulate mood impact on wellness
    const moodImpact = { great: 95, good: 85, neutral: 78, low: 65, stressed: 55 };
    setWellness(moodImpact[mood as keyof typeof moodImpact]);
  };

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  const generateInsight = () => {
    setAiInsights(prev => prev + 1);
  };

  const moods = [
    { key: 'great', emoji: '😊', color: 'from-green-400 to-emerald-500', label: 'Excellent' },
    { key: 'good', emoji: '🙂', color: 'from-blue-400 to-cyan-500', label: 'Good' },
    { key: 'neutral', emoji: '😐', color: 'from-yellow-400 to-orange-500', label: 'Neutral' },
    { key: 'low', emoji: '😔', color: 'from-orange-400 to-red-500', label: 'Low' },
    { key: 'stressed', emoji: '😰', color: 'from-red-400 to-pink-500', label: 'Stressed' }
  ];

  const ParticleField = () => (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const NeuroGrid = () => (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <svg width="100%" height="100%" className="absolute">
        <defs>
          <pattern id="neurogrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="url(#neonGradient)" opacity="0.5"/>
            <line x1="0" y1="50" x2="100" y2="50" stroke="url(#neonGradient)" strokeWidth="0.5" opacity="0.3"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="url(#neonGradient)" strokeWidth="0.5" opacity="0.3"/>
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
      className="min-h-screen bg-black text-white overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(0, 255, 255, 0.15) 0%, 
          rgba(0, 128, 255, 0.1) 25%, 
          rgba(16, 16, 32, 0.8) 50%, 
          #000000 100%)`
      }}
    >
      <ParticleField />
      <NeuroGrid />
      
      {/* Dynamic Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: `radial-gradient(circle, 
                rgba(0, 255, 255, ${0.1 + i * 0.05}) 0%, 
                rgba(0, 128, 255, ${0.05 + i * 0.03}) 30%, 
                transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + i * 2}s`,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          />
        ))}
      </div>

      {/* Holographic Header */}
      <header className="relative z-50 backdrop-blur-2xl bg-gradient-to-r from-black/40 via-cyan-900/20 to-black/40 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <nav className="flex justify-between items-center">
            <div className="relative">
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                MINDFLOW
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg blur opacity-20 animate-pulse"></div>
            </div>
            <div className="hidden md:flex space-x-12">
              {['Neural Dashboard', 'Quantum Insights', 'Bio Settings'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group text-cyan-100 hover:text-cyan-400 transition-all duration-500 font-medium tracking-wide"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-500 group-hover:w-full"></div>
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <section className="text-center py-24">
          <div className="relative">
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                NEURAL
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                WELLNESS
              </span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse -z-10"></div>
          </div>
          <p className="text-2xl text-cyan-100/80 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the future of mental health tracking with AI-powered consciousness analysis and quantum-enhanced wellness optimization
          </p>
        </section>

        {/* Futuristic Dashboard Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {/* Mood Nexus */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-cyan-900/20 via-black/40 to-blue-900/20 border border-cyan-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-cyan-400/70 hover:shadow-[0_0_50px_rgba(0,255,255,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(0,255,255,0.5)] group-hover:shadow-[0_0_50px_rgba(0,255,255,0.8)] transition-all duration-500">
                🧠
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Mood Nexus
              </h3>
              <p className="text-cyan-100/70 mb-8 text-lg">
                Neural state analysis with quantum emotional mapping
              </p>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.key}
                    onClick={() => selectMood(mood.key)}
                    className={`relative group/mood w-14 h-14 rounded-xl border-2 transition-all duration-500 flex items-center justify-center text-2xl ${
                      selectedMood === mood.key
                        ? `bg-gradient-to-br ${mood.color} border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]`
                        : 'bg-black/50 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10'
                    }`}
                  >
                    <span className="relative z-10">{mood.emoji}</span>
                    <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} rounded-xl opacity-0 group-hover/mood:opacity-20 transition-opacity duration-300`}></div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="text-sm text-cyan-400 font-medium">
                  Current State: {moods.find(m => m.key === selectedMood)?.label}
                </div>
              </div>
            </div>
          </div>

          {/* Quantum Analytics */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-purple-900/20 via-black/40 to-pink-900/20 border border-purple-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-purple-400/70 hover:shadow-[0_0_50px_rgba(128,0,255,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '100ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(128,0,255,0.5)] group-hover:shadow-[0_0_50px_rgba(128,0,255,0.8)] transition-all duration-500">
                📊
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quantum Analytics
              </h3>
              <p className="text-purple-100/70 mb-8 text-lg">
                Multi-dimensional wellness probability matrices
              </p>
              <div className="relative mb-8">
                <div className="bg-black/50 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(128,0,255,0.8)]"
                    style={{ width: `${wellness}%` }}
                  />
                </div>
                <div className="absolute -top-8 right-0 text-2xl font-bold text-purple-400">
                  {wellness}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-black/30 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-purple-400 mb-2">{wellness}%</div>
                  <div className="text-sm text-purple-200/70">Neural Harmony</div>
                </div>
                <div className="text-center p-6 bg-black/30 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-pink-400 mb-2">12</div>
                  <div className="text-sm text-purple-200/70">Sync Events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Breathing Vortex */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-emerald-900/20 via-black/40 to-teal-900/20 border border-emerald-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-emerald-400/70 hover:shadow-[0_0_50px_rgba(0,255,128,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(0,255,128,0.5)] group-hover:shadow-[0_0_50px_rgba(0,255,128,0.8)] transition-all duration-500">
                🌬️
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Breathing Vortex
              </h3>
              <p className="text-emerald-100/70 mb-8 text-lg">
                Biometric synchronization with quantum breathing patterns
              </p>
              <div className="relative flex justify-center mb-8">
                <div className={`w-32 h-32 border-4 border-emerald-400/50 rounded-full relative ${isBreathing ? 'animate-pulse' : ''}`}>
                  <div className={`absolute inset-4 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full transition-all duration-4000 ${isBreathing ? 'scale-110' : 'scale-100'}`} />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10 animate-ping" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={toggleBreathing}
                  className={`py-4 px-6 rounded-2xl font-bold transition-all duration-500 ${
                    isBreathing 
                      ? 'bg-gradient-to-r from-red-400/20 to-orange-400/20 border-2 border-red-400/40 text-red-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                      : 'bg-gradient-to-r from-emerald-400/20 to-teal-400/20 border-2 border-emerald-400/40 text-emerald-300 hover:shadow-[0_0_20px_rgba(0,255,128,0.3)]'
                  }`}
                >
                  {isBreathing ? 'Stop' : 'Start'} Sync
                </button>
                <button className="py-4 px-6 bg-black/30 border-2 border-emerald-500/30 rounded-2xl text-emerald-300 font-bold hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-500">
                  History
                </button>
              </div>
            </div>
          </div>

          {/* AI Consciousness */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-indigo-900/20 via-black/40 to-violet-900/20 border border-indigo-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-indigo-400/70 hover:shadow-[0_0_50px_rgba(100,100,255,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-violet-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(100,100,255,0.5)] group-hover:shadow-[0_0_50px_rgba(100,100,255,0.8)] transition-all duration-500">
                🤖
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                AI Consciousness
              </h3>
              <p className="text-indigo-100/70 mb-8 text-lg">
                Neural network insights from quantum consciousness analysis
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-6 bg-black/30 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-indigo-400 mb-2">{aiInsights}</div>
                  <div className="text-sm text-indigo-200/70">Active Insights</div>
                </div>
                <div className="text-center p-6 bg-black/30 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-black text-violet-400 mb-2">∞</div>
                  <div className="text-sm text-indigo-200/70">Processing</div>
                </div>
              </div>
              <button
                onClick={generateInsight}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-400/20 to-violet-400/20 border-2 border-indigo-400/40 rounded-2xl text-indigo-300 font-bold hover:border-indigo-400 hover:bg-indigo-400/10 transition-all duration-500 hover:shadow-[0_0_20px_rgba(100,100,255,0.3)]"
              >
                Generate Insight
              </button>
            </div>
          </div>

          {/* Quantum Goals */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-orange-900/20 via-black/40 to-red-900/20 border border-orange-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-orange-400/70 hover:shadow-[0_0_50px_rgba(255,165,0,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(255,165,0,0.5)] group-hover:shadow-[0_0_50px_rgba(255,165,0,0.8)] transition-all duration-500">
                🎯
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Quantum Goals
              </h3>
              <p className="text-orange-100/70 mb-8 text-lg">
                Probability-based achievement tracking with temporal optimization
              </p>
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex justify-between mb-3">
                    <span className="text-lg font-medium text-orange-300">Neural Training</span>
                    <span className="text-lg font-bold text-orange-400">87%</span>
                  </div>
                  <div className="bg-black/50 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,165,0,0.8)]" style={{ width: '87%' }} />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex justify-between mb-3">
                    <span className="text-lg font-medium text-orange-300">Consciousness Sync</span>
                    <span className="text-lg font-bold text-orange-400">92%</span>
                  </div>
                  <div className="bg-black/50 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,165,0,0.8)]" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Protocol */}
          <div className={`group relative backdrop-blur-2xl bg-gradient-to-br from-red-900/20 via-black/40 to-pink-900/20 border border-red-500/30 rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:border-red-400/70 hover:shadow-[0_0_50px_rgba(255,0,100,0.3)] ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '500ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-pink-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_30px_rgba(255,0,100,0.5)] group-hover:shadow-[0_0_50px_rgba(255,0,100,0.8)] transition-all duration-500">
                🚨
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Emergency Protocol
              </h3>
              <p className="text-red-100/70 mb-8 text-lg">
                Quantum-encrypted crisis response with neural priority routing
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="py-4 px-6 bg-gradient-to-r from-red-400/20 to-pink-400/20 border-2 border-red-400/40 rounded-2xl text-red-300 font-bold hover:border-red-400 hover:bg-red-400/10 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,0,100,0.3)]">
                  Crisis Mode
                </button>
                <button className="py-4 px-6 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border-2 border-cyan-400/40 rounded-2xl text-cyan-300 font-bold hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                  Support Net
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="py-4 px-6 bg-black/30 border-2 border-red-500/30 rounded-2xl text-red-300 font-bold hover:border-red-400 hover:bg-red-400/10 transition-all duration-500">
                  Mind Journal
                </button>
                <button className="py-4 px-6 bg-black/30 border-2 border-red-500/30 rounded-2xl text-red-300 font-bold hover:border-red-400 hover:bg-red-400/10 transition-all duration-500">
                  Find Help
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}