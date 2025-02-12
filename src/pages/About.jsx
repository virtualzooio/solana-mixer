import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-8">Über uns</h2>
          <p className="text-lg text-gray-600 mb-6">
            Seit 2020 sind wir Ihr vertrauenswürdiger Partner für diskrete Lebensfreude. 
            Wir legen größten Wert auf Qualität, Diskretion und Kundenzufriedenheit.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Unser Team besteht aus erfahrenen Experten, die Ihnen bei Fragen gerne zur Seite stehen.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300"
          >
            Kontaktiere uns
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
