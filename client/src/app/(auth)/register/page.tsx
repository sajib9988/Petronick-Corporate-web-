"use client";

import FloatingBubbles from '@/components/auth/FloatingBubbles';
import RegisterForm from '@/components/auth/registerForm';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-[#091921] overflow-hidden relative"
      suppressHydrationWarning   // ← এটা যোগ করো (extra safety)
    >
      <FloatingBubbles />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[400px] px-4"
      >
        <RegisterForm /> 
      </motion.div>
    </div>
  );
};

export default RegisterPage;