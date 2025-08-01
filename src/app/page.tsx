"use client";
import React, { useEffect, useState } from "react";
import emotions from "@/components/ui/emotions";
import { Ripple } from "@/components/ui/ripple";
import { motion } from "framer-motion";
import { ArrowRight, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  interface Emotion {
    value: number;
    color: string;
  }

  const [emotion] = useState(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((e: Emotion) => Math.abs(emotion - e.value) < 15) ||
    emotions[2];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        {/* 🔵 Background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60
                        w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]`}
          />
          <div
            className="absolute rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700
                       w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]"
          />
          <Ripple className="opacity-60" />
        </div>

        {/* 🟢 Foreground content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 space-y-8 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm sm:text-base border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Mental Health Tracking Companion
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-bold font-plus-jakarta tracking-tight text-4xl md:text-6xl lg:text-8xl">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
              Find Peace
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              of Mind
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 sm:mt-10 max-w-[600px] mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Experience a new way of emotional support. Our AI companion is here
            to listen, understand, and guide you through lifes journey.
          </p>

          <motion.div
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground font-medium">
                How are you feeling today?
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => setShowDialog(true)}
              className="relative group h-12 px-8 rounded-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:to-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 font-medium flex items-center gap-2">
                Begin Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 bg-pos-0 group-hover:bg-pos-100" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 🧠 MODAL DIALOG */}
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
            <h2 className="text-xl font-bold mb-2">Welcome!</h2>
            <p className="text-muted-foreground mb-4">
              You are about to begin your journey. Are you ready?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Link href="/main">
                <Button onClick={() => setShowDialog(false)}>
                  Lets Go
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
