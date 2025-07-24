"use client"
import React, { useEffect, useState } from 'react'
import emotions from '@/components/ui/emotions'
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { Meteors } from '@/components/ui/meteors';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const page = () => {
   interface Emotion {
    value: number;
    color: string;

  }
  const [mounted, setMounted] = useState(false);
  const [emotion, setEmotions] = useState(0);
  const { user } = useUser();


    async function saveEmotion(){ 
      const selected =
    emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) || emotions[2];

     const moodText = selected.label.split(" ")[1]; // this is a string
      const {data,error}=await supabase
        .from("entries")
        .insert([{ 
          mood:moodText, 
          user_id: user?.id,
        }])

        if (error){
          console.error("Error saving mood:", error);  
        }
        else {
          console.log("Emotion saved successfully:", data);
        }
    }

    useEffect(() => {
      setMounted(true);
    }, []);

    const currentEmotion =
    emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) ||
    emotions[2];
    
  return (
    <div className="flex flex-col min-h-screen relative">


      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <Meteors number={50} className="fixed" />
      </div>

        <div className="relative flex py-40 w-full flex-col items-center justify-center rounded-lg">
        <h1 className="font-bold font-plus-jakarta tracking-tight text-4xl md:text-6xl lg:text-8xl leading-[1.4]">
        <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">How are you Feeling?
        </span>
        </h1>
      </div>

        {/* Emotion slider section with enhanced transitions */}
          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground/80 font-medium">
                Whatever you're feeling, we're here to listen
              </p>
              <div className="flex justify-between items-center px-2">
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
            </div>

            {/* Enhanced slider with dynamic gradient */}
            <div className="relative px-2">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
              />
              <Slider
                value={[emotion]}
                onValueChange={(value) => setEmotions(value[0])}
                min={0}
                max={100}
                step={1}
                className="py-4"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground animate-pulse">
                Slide to express how you're feeling today
              </p>
            </div>
          </motion.div>
          <Button
        onClick={saveEmotion}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save Emotion
      </Button>
    </div>
  )
}

export default page


