import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaHeart, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaRocket className="text-5xl" />,
    title: "MAXIMALE POWER",
    description: "Unsere Toys bringen dich in neue Galaxien 🚀"
  },
  {
    icon: <FaHeart className="text-5xl" />,
    title: "PURE EKSTASE",
    description: "Erlebe Orgasmen wie nie zuvor ⭐"
  },
  {
    icon: <FaLock className="text-5xl" />,
    title: "100% DISKRET",
    description: "Dein Geheimnis ist bei uns sicher 🤫"
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20 text-pink-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          WARUM WIR?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-pink-500 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 rounded-full text-white font-bold animated-btn"
              >
                Mehr erfahren
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
