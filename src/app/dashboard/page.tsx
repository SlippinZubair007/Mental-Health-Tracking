"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Heart, Brain,Zap, Target, BarChart3, Moon, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

interface MentalHealthEntry {
  id: string;
  entry_date: string;
  mood: string | number; // Can be either categorical string or numerical
  stress_level: number;
  sleep_hours: number;
  journal_text: string;
  user_id: string;
}


interface ActivityData {
  name: string;
  value: number;
}


// Mood mapping function
const moodToNumber = (mood: string | number): number => {
  if (typeof mood === 'number') return mood;
  
  const moodMap: { [key: string]: number } = {
    'Down': 2,
    'Content': 5,
    'Peaceful': 7,
    'Happy': 8,
    'Excited': 9
  };
  
  return moodMap[mood] || 5; // Default to 5 if mood not found
};

// Reverse mapping function for display
const numberToMood = (num: number): string => {
  if (num <= 2) return 'Down';
  if (num <= 4) return 'Content';
  if (num <= 6) return 'Peaceful';
  if (num <= 8) return 'Happy';
  return 'Excited';
};

// Mock data for demonstration
const mockEntries: MentalHealthEntry[] = [
  {
    id: '1',
    entry_date: '2025-01-22',
    mood: 'Happy',
    stress_level: 4,
    sleep_hours: 7.5,
    journal_text: 'Had a productive day at work. Feeling optimistic about the new project.',
    user_id: 'demo-user'
  },
  {
    id: '2',
    entry_date: '2025-01-23',
    mood: 'Down',
    stress_level: 6,
    sleep_hours: 6,
    journal_text: 'Bit stressed about upcoming deadlines but managing okay.',
    user_id: 'demo-user'
  },
  {
    id: '3',
    entry_date: '2025-01-24',
    mood: 'Content',
    stress_level: 3,
    sleep_hours: 8,
    journal_text: 'Great day! Completed my workout and had a nice evening with friends.',
    user_id: 'demo-user'
  },
  {
    id: '4',
    entry_date: '2025-01-25',
    mood: 'Excited',
    stress_level: 7,
    sleep_hours: 5.5,
    journal_text: 'Rough day. Too much work and not enough sleep.',
    user_id: 'demo-user'
  },
  {
    id: '5',
    entry_date: '2025-01-26',
    mood: 'Down',
    stress_level: 4,
    sleep_hours: 7,
    journal_text: 'Feeling better after a good rest. Meditation helped.',
    user_id: 'demo-user'
  },
  {
    id: '6',
    entry_date: '2025-01-27',
    mood: 'Happy',
    stress_level: 2,
    sleep_hours: 8.5,
    journal_text: 'Excellent day! Everything went smoothly and I felt very positive.',
    user_id: 'demo-user'
  },
  {
    id: '7',
    entry_date: '2025-01-28',
    mood: 'Content',
    stress_level: 5,
    sleep_hours: 7,
    journal_text: 'Average day. Some challenges but handled them well.',
    user_id: 'demo-user'
  }
];

const MentalHealthDashboard: React.FC = () => {
  const { user } = useUser();
  
  const [entries, setEntries] = useState<MentalHealthEntry[]>(mockEntries);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchEntries = async () => {
    setLoading(true);
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('entries') 
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: true });

    if (error) {
      console.error('Error fetching mental health data:', error);
    } else {
      setEntries(data as MentalHealthEntry[]);
    }

    setLoading(false);
  };

  fetchEntries();
}, [user?.id]);


  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (entries.length === 0) {
      return {
        avgMood: '0',
        avgStress: '0',
        totalSleep: 0,
        improvement: 'stable' as const,
        totalEntries: 0
      };
    }

    const recent = entries.slice(-7);
    const avgMood = recent.reduce((sum, e) => sum + moodToNumber(e.mood), 0) / recent.length;
    const avgStress = recent.reduce((sum, e) => sum + e.stress_level, 0) / recent.length;
    const totalSleep = recent.reduce((sum, e) => sum + e.sleep_hours, 0);

    // Determine improvement trend
    let improvement: 'positive' | 'stable' | 'needs attention' = 'stable';
    if (recent.length > 3) {
      const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
      const secondHalf = recent.slice(Math.floor(recent.length / 2));
      const firstAvg = firstHalf.reduce((sum, e) => sum + moodToNumber(e.mood), 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, e) => sum + moodToNumber(e.mood), 0) / secondHalf.length;
      
      if (secondAvg > firstAvg + 0.5) improvement = 'positive';
      else if (secondAvg < firstAvg - 0.5) improvement = 'needs attention';
    }

    return {
      avgMood: avgMood.toFixed(1),
      avgStress: avgStress.toFixed(1),
      totalSleep: Math.round(totalSleep * 10) / 10,
      improvement,
      totalEntries: entries.length
    };
  }, [entries]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return entries.map(e => ({
      date: new Date(e.entry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: moodToNumber(e.mood),
      stress: e.stress_level,
      sleep: e.sleep_hours,
    }));
  }, [entries]);

  // Fixed activityData calculation
  const activityData: ActivityData[] = useMemo(() => {
    const moodRanges = { 'Excited': 0, 'Happy': 0, 'Peaceful': 0, 'Content': 0, 'Down': 0 };
    
    entries.forEach(entry => {
      const moodStr = typeof entry.mood === 'string' ? entry.mood : numberToMood(moodToNumber(entry.mood));
      if (moodRanges.hasOwnProperty(moodStr)) {
        moodRanges[moodStr as keyof typeof moodRanges]++;
      }
    });

    return Object.entries(moodRanges)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  }, [entries]);

  const COLORS = ['#00D4FF', '#7C3AED', '#F59E0B', '#EF4444', '#10B981'];

  interface MetricCardProps {
    title: string;
    value: string | number;
    unit: string;
    trend?: 'up' | 'down';
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    gradient: string;
  }

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, trend, icon: Icon, gradient }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-lg"
           style={{ background: gradient }}></div>
      <div className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center p-2 rounded-full backdrop-blur-sm ${
              trend === 'up' 
                ? 'text-emerald-400 bg-emerald-400/20' 
                : 'text-red-400 bg-red-400/20'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
          )}
        </div>
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-white mt-2 mb-1">
          {value}<span className="text-lg text-white/60 ml-1">{unit}</span>
        </p>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000`}
               style={{ width: `${Math.min((Number(value) / 10) * 100, 100)}%` }}></div>
        </div>
      </div>
    </div>
  );

  interface HistoryItemProps {
    item: MentalHealthEntry;
  }

  const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
    const moodValue = moodToNumber(item.mood);
    
    return (
      <div className="group relative">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm"></div>
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 mb-4 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/90 font-medium text-sm tracking-wide">
              {new Date(item.entry_date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                moodValue >= 8 ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' :
                moodValue >= 6 ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' :
                'bg-red-400/20 text-red-300 border-red-400/30'
              }`}>
                Mood: {typeof item.mood === 'string' ? item.mood : numberToMood(moodValue)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/70 mb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Stress: {item.stress_level}/10</span>
            </div>
            <div className="flex items-center space-x-2">
              <Moon className="w-4 h-4 text-cyan-400" />
              <span>Sleep: {item.sleep_hours}h</span>
            </div>
          </div>
          {item.journal_text && (
            <div className="flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-white/60 italic bg-white/5 rounded-lg p-3 border-l-2 border-cyan-400/40 flex-1">
                {item.journal_text}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show loading while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-centerp-6">
        <div className="text-white text-xl">Loading your wellness data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Neural Wellness Dashboard
          </h1>
          <p className="text-white/70 text-lg">Advanced mental health analytics & progress tracking</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Average Mood"
            value={summaryStats.avgMood}
            unit="/10"
            trend={Number(summaryStats.avgMood) > 7 ? 'up' : 'down'}
            icon={Heart}
            gradient="from-pink-500 to-rose-500"
          />
          <MetricCard
            title="Stress Level"
            value={summaryStats.avgStress}
            unit="/10"
            trend={Number(summaryStats.avgStress) < 4 ? 'up' : 'down'}
            icon={Brain}
            gradient="from-purple-500 to-violet-500"
          />
          <MetricCard
            title="Total Sleep"
            value={summaryStats.totalSleep}
            unit="hrs"
            trend="up"
            icon={Moon}
            gradient="from-cyan-500 to-blue-500"
          />
          <MetricCard
            title="Total Entries"
            value={summaryStats.totalEntries}
            unit=""
            trend="up"
            icon={BookOpen}
            gradient="from-emerald-500 to-green-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Trends */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Mood & Stress Trends</h2>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                  <Line type="monotone" dataKey="mood" stroke="#00D4FF" strokeWidth={3} dot={{ fill: '#00D4FF', strokeWidth: 2, r: 5 }} name="Mood" />
                  <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Mood Distribution</h2>
              </div>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) =>
  `${entry.name}: ${entry.percent !== undefined ? (entry.percent * 100).toFixed(0) : '0'}%`
}

                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Chart */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Sleep Patterns</h2>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <defs>
                  <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="sleep" stroke="#10B981" fillOpacity={1} fill="url(#sleepGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* History Component */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Recent Entries</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/70">{entries.length} total entries</span>
              </div>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {entries.slice().reverse().map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Overall Progress Summary */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Wellness Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group/item">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover/item:scale-110 transition-transform duration-300">
                  {summaryStats.avgMood}/10
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Average Mood Score</div>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mt-2"></div>
              </div>
              <div className="text-center group/item">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2 group-hover/item:scale-110 transition-transform duration-300">
                  {summaryStats.totalEntries}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Total Journal Entries</div>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto mt-2"></div>
              </div>
              <div className="text-center group/item">
                <div className={`text-4xl font-bold mb-2 group-hover/item:scale-110 transition-transform duration-300 ${
                  summaryStats.improvement === 'positive' ? 'bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent' :
                  summaryStats.improvement === 'stable' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent' : 
                  'bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent'
                }`}>
                  {summaryStats.improvement === 'positive' ? '↗' : 
                   summaryStats.improvement === 'stable' ? '→' : '↘'}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{summaryStats.improvement.replace('_', ' ')}</div>
                <div className={`w-16 h-1 rounded-full mx-auto mt-2 ${
                  summaryStats.improvement === 'positive' ? 'bg-gradient-to-r from-emerald-400 to-green-400' :
                  summaryStats.improvement === 'stable' ? 'bg-gradient-to-r from-amber-400 to-yellow-400' : 
                  'bg-gradient-to-r from-red-400 to-pink-400'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;