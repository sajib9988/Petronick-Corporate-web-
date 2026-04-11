"use client";
import React from 'react'
import LoginForm from '@/components/auth/loginForm'
import { motion } from 'framer-motion'

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#091921] overflow-hidden relative">
      
      {/* Background Animated Water Bubbles */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Login Form Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[400px] px-4"
      >
        <LoginForm /> 
      </motion.div>
    </div>
  )
}

export default LoginPage