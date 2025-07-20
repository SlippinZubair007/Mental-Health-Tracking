'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'

const SignUppage = () => {
  return (
    <div className="min-h-screen text-white font-sans relative">
      

      {/* 🔒 Sign Up Container */}
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 80 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <SignUp/>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUppage