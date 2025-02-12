import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Der Zerstörer 3000",
    price: "169,99 €",
    description: "Bringt dich in eine andere Dimension 🚀",
    image: "https://placehold.co/400x400/ff69b4/ffffff?text=🔥"
  },
  {
    id: 2,
    name: "Magic Wand Pro Max",
    price: "199,99 €",
    description: "Dein Ticket zum Paradies 💫",
    image: "https://placehold.co/400x400/ff1493/ffffff?text=✨"
  },
  {
    id: 3,
    name: "Butterfly Ultra",
    price: "149,99 €",
    description: "Lass dich auf Wolke 7 tragen 🦋",
    image: "https://placehold.co/400x400/ff69b4/ffffff?text=🦋"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20 text-pink-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          UNSERE BESTSELLER
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-2 text-pink-500">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-white">{product.price}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full text-white font-bold animated-btn"
                >
                  In den Korb
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
