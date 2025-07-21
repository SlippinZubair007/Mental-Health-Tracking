"use client"
import React, { useState } from 'react';
import { Calendar, Moon, Heart, Zap, BookOpen } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [stressLevel, setStressLevel] = useState(3);
  const [journalEntry, setJournalEntry] = useState('');
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepQuality, setSleepQuality] = useState(3);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😍', label: 'Excited', value: 'excited' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' }
  ];

  const handleSubmit = () => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      stressLevel,
      journalEntry,
      sleepHours,
      sleepQuality,
      timestamp: new Date().toISOString()
    };
    
    console.log('Mood entry saved:', entry);
    
    // Reset form
    setSelectedMood('');
    setStressLevel(3);
    setJournalEntry('');
    setSleepHours(8);
    setSleepQuality(3);
    
    alert('Daily mood logged successfully! 🎉');
  };

  const isFormValid = selectedMood && journalEntry.trim();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent mb-2">
            Daily Mood Tracker
          </h1>
          <p className="text-gray-200 text-lg">How are you feeling today?</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
          {/* Mood Selection */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Your Mood</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.value
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-gray-700">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Stress Level</h2>
              </div>
              <span className="text-2xl font-bold text-red-500">{stressLevel}/5</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #f97316 25%, #eab308 50%, #84cc16 75%, #22c55e 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Very Low</span>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>
          </div>

          {/* Journal Entry */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Journal Entry</h2>
            </div>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="How was your day? What made you feel this way? Share your thoughts..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors"
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {journalEntry.length}/500 characters
            </div>
          </div>

          {/* Sleep Tracking */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Moon className="w-5 h-5 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Sleep</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours of Sleep
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-indigo-600">{sleepHours}h</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Quality
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-indigo-600">{sleepQuality}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-200 ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isFormValid ? '✨ Log My Day' : 'Please complete all required fields'}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Track your daily mood to better understand your emotional patterns 💜</p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #ef4444;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #ef4444;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #6366f1;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #6366f1;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default MoodTracker;