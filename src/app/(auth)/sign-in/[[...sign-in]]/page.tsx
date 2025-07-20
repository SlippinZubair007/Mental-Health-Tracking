'use client'; // 🟡 IMPORTANT for Framer + Clerk in App Router

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React from 'react';

const SignInpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 50 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <SignIn/>
      </motion.div>
    </div>
  );
};

export default SignInpage;