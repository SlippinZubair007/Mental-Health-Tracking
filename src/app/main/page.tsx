"use client"
import React, { useEffect, useState } from 'react'
import emotions from '@/components/ui/emotions'
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Meteors } from '@/components/ui/meteors';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, Target, Moon, Zap, FileText, Sparkles } from 'lucide-react';

const page = () => {
  interface Emotion {
    value: number;
    color: string;
    label: string;
  }

  const [mounted, setMounted] = useState(false);
  const [emotion, setEmotions] = useState(50);
  const [stressLevel, setStressLevel] = useState(50);
  const [sleepHours, setSleepHours] = useState(7);
  const [journalText, setJournalText] = useState('');
  const [goal, setGoal] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { user } = useUser();

  const stressColors = [
    { min: 0, max: 20, color: 'from-green-400 via-green-500 to-green-600', label: 'Very Relaxed' },
    { min: 21, max: 40, color: 'from-blue-400 via-blue-500 to-blue-600', label: 'Calm' },
    { min: 41, max: 60, color: 'from-yellow-400 via-yellow-500 to-yellow-600', label: 'Moderate' },
    { min: 61, max: 80, color: 'from-orange-400 via-orange-500 to-orange-600', label: 'Stressed' },
    { min: 81, max: 100, color: 'from-red-400 via-red-500 to-red-600', label: 'Very Stressed' }
  ];

  const sleepColors = [
    { min: 0, max: 4, color: 'from-red-400 via-red-500 to-red-600', label: 'Severely Sleep Deprived' },
    { min: 5, max: 6, color: 'from-orange-400 via-orange-500 to-orange-600', label: 'Sleep Deprived' },
    { min: 7, max: 8, color: 'from-green-400 via-green-500 to-green-600', label: 'Well Rested' },
    { min: 9, max: 10, color: 'from-blue-400 via-blue-500 to-blue-600', label: 'Very Well Rested' },
    { min: 11, max: 12, color: 'from-purple-400 via-purple-500 to-purple-600', label: 'Oversleep' }
  ];

  const getCurrentStressColor = () => {
    return stressColors.find(s => stressLevel >= s.min && stressLevel <= s.max) || stressColors[2];
  };

  const getCurrentSleepColor = () => {
    return sleepColors.find(s => sleepHours >= s.min && sleepHours <= s.max) || sleepColors[1];
  };

  async function generateAIAnalysis() {
    if (!user) return;

    const selectedEmotion = emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) || emotions[2];
    const moodText = selectedEmotion.label.split(" ")[1];
    const stressLabel = getCurrentStressColor().label;
    const sleepLabel = getCurrentSleepColor().label;

    const prompt = `
    Analyze this user's mental wellness data and provide insights:
    
    Mood: ${moodText} (${emotion}/100)
    Stress Level: ${stressLabel} (${stressLevel}/100)
    Sleep: ${sleepHours} hours (${sleepLabel})
    Journal Entry: ${journalText || 'No journal entry provided'}
    Current Goal: ${goal || 'No specific goal set'}
    
    Please provide:
    1. Overall mental wellness assessment
    2. Specific recommendations for improvement
    3. Progress insights if applicable
    4. Actionable next steps
    
    Keep the response encouraging, professional, and under 300 words.
    `;

    try {
      // Replace with your actual Gemini API integration
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI analysis');
      }

      const result = await response.json();
      return result.analysis;
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      return `Based on your current data:

Mental Wellness Level: ${moodText} mood with ${stressLabel.toLowerCase()} stress levels.

Recommendations:
• Your sleep pattern (${sleepHours} hours) ${sleepHours >= 7 && sleepHours <= 9 ? 'looks healthy' : sleepHours < 7 ? 'could be improved - aim for 7-9 hours' : 'might be excessive - consider 7-9 hours optimal'}
• ${stressLevel > 60 ? 'Consider stress management techniques like meditation or exercise' : 'Your stress levels seem manageable'}
• ${journalText ? 'Great job on journaling - it helps with self-reflection' : 'Consider adding journal entries to track your thoughts'}

Keep focusing on your goal: ${goal || 'Set a specific wellness goal to track your progress'}

Remember: Small consistent improvements lead to significant changes over time.`;
    }
  }

  async function saveAllData() {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const selectedEmotion = emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) || emotions[2];
      const moodText = selectedEmotion.label.split(" ")[1];

      // Save entry data
      const { error: entryError } = await supabase
        .from("entries")
        .insert([{
          mood: moodText,
          stress_level: stressLevel,
          sleep_hours: sleepHours,
          journal_text: journalText,
          user_id: user?.id,
        }]);

      if (entryError) {
        console.error("Error saving entry:", entryError);
        return;
      }

      // Generate AI analysis
      const analysis = await generateAIAnalysis();
      setAiResult(analysis);

      // Save goal with AI result
      if (goal) {
const { error: goalError } = await supabase
  .from("goals")
  .insert([{ description: goal, result: analysis }]);


        if (goalError) {
          console.error("Error saving goal:", goalError);
        }
      }

      console.log("All data saved successfully");
    } catch (error) {
      console.error("Error in saveAllData:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion = emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) || emotions[2];
  const currentStress = getCurrentStressColor();
  const currentSleep = getCurrentSleepColor();

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <Meteors number={50} className="fixed" />
      </div>

      <div className="relative flex py-20 w-full flex-col items-center justify-center rounded-lg">
        <h1 className="font-bold font-plus-jakarta tracking-tight text-4xl md:text-6xl lg:text-8xl leading-[1.4]">
          <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
            Wellness Tracker
          </span>
        </h1>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-8 px-4 pb-20">
        {/* Mood Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="w-5 h-5 text-primary" />
                How are you feeling?
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Express your current emotional state
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center px-2 mb-4">
                {emotions.map((em) => (
                  <div
                    key={em.value}
                    className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                      Math.abs(emotion - em.value) < 15
                        ? "opacity-100 scale-110 transform-gpu"
                        : "opacity-50 scale-100"
                    }`}
                    onClick={() => setEmotions(em.value)}
                  >
                    <div className="text-2xl transform-gpu">
                      {em.label.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-medium">
                      {em.label.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative px-2">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`} />
                <Slider
                  value={[emotion]}
                  onValueChange={(value) => setEmotions(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stress Level Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="w-5 h-5 text-orange-500" />
                Stress Level: {currentStress.label}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Rate your current stress from 0 (completely relaxed) to 100 (extremely stressed)
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative px-2">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentStress.color} to-transparent blur-2xl -z-10 transition-all duration-500`} />
                <Slider
                  value={[stressLevel]}
                  onValueChange={(value) => setStressLevel(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold">{stressLevel}/100</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sleep Hours Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Moon className="w-5 h-5 text-blue-500" />
                Sleep: {sleepHours} hours ({currentSleep.label})
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                How many hours did you sleep last night?
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative px-2">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentSleep.color} to-transparent blur-2xl -z-10 transition-all duration-500`} />
                <Slider
                  value={[sleepHours]}
                  onValueChange={(value) => setSleepHours(value[0])}
                  min={0}
                  max={12}
                  step={0.5}
                  className="py-4"
                />
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold">{sleepHours} hours</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-green-500" />
                Journal Entry
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Share your thoughts, experiences, or anything on your mind
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's on your mind today? How are you feeling about your goals and progress?"
                value={journalText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJournalText(e.target.value)}
                className="min-h-[120px] bg-background/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-5 h-5 text-purple-500" />
                Current Wellness Goal
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                What would you like to work on or achieve?
              </p>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., Reduce stress, improve sleep quality, practice mindfulness..."
                value={goal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)}
                className="bg-background/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Save and Analyze Button */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Button
            onClick={saveAllData}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:to-primary text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with AI...
              </div>
            ) : (
              <div className="flex items-center gap-2 text-black">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                Save & Get AI Analysis
              </div>
            )}
          </Button>

          {aiResult && (
            <Button
              onClick={() => setShowResult(!showResult)}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              {showResult ? 'Hide' : 'View'} AI Analysis
            </Button>
          )}
        </motion.div>

        {/* AI Analysis Result */}
        {showResult && aiResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Wellness Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground/90">
                  {aiResult.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default page