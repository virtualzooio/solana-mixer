import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Hero />
          <About />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
