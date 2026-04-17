"use client";
import React from 'react';
import LoginForm from '@/components/auth/loginForm';
import { motion } from 'framer-motion';

const LoginPage = () => {
  // Fixed bubble configurations (deterministic)
  const bubbles = [
    { size: 85, left: '12%', top: '25%', duration: 18 },
    { size: 65, left: '78%', top: '65%', duration: 14 },
    { size: 110, left: '35%', top: '80%', duration: 22 },
    { size: 55, left: '85%', top: '15%', duration: 16 },
    { size: 95, left: '22%', top: '55%', duration: 19 },
  ];

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-[#091921] overflow-hidden relative"
      suppressHydrationWarning
    >
      
      {/* Background Animated Water Bubbles */}
      <div className="absolute inset-0 z-0">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              top: bubble.top,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, 40, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5, // staggered start
            }}
          />
        ))}
      </div>

      {/* Main Login Form Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[400px] px-4"
      >
        <LoginForm /> 
      </motion.div>
    </div>
  );
};

export default LoginPage;