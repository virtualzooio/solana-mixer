import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Deluxe Vibrator",
    price: "89,99 €",
    description: "Premium Qualität mit 10 Vibrationsmodi",
    image: "https://placehold.co/300x300/ff69b4/ffffff?text=Vibrator+1"
  },
  {
    id: 2,
    name: "Butterfly Dream",
    price: "79,99 €",
    description: "Wasserdicht und USB-aufladbar",
    image: "https://placehold.co/300x300/ff69b4/ffffff?text=Vibrator+2"
  },
  {
    id: 3,
    name: "Magic Wand",
    price: "99,99 €",
    description: "Kabellos mit extra langer Akkulaufzeit",
    image: "https://placehold.co/300x300/ff69b4/ffffff?text=Vibrator+3"
  }
];

export default function Products() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Unsere Produkte
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300"
                  >
                    In den Warenkorb
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
