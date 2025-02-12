import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaRandom } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen py-20 relative" id="about">
      <div className="absolute inset-0 sexy-gradient opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            HOW IT WORKS
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-pink-500 text-5xl mb-6">
              <FaRandom />
            </div>
            <h3 className="text-2xl font-bold mb-4">Multi-Hop Routing</h3>
            <p className="text-gray-400">
              Your transaction is split and routed through multiple temporary wallets,
              making it impossible to trace the original source.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="text-pink-500 text-5xl mb-6">
              <FaShieldAlt />
            </div>
            <h3 className="text-2xl font-bold mb-4">Cross-Chain Privacy</h3>
            <p className="text-gray-400">
              We utilize cross-chain swaps to further obfuscate the transaction path,
              providing an additional layer of privacy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="text-pink-500 text-5xl mb-6">
              <FaLock />
            </div>
            <h3 className="text-2xl font-bold mb-4">Zero Knowledge</h3>
            <p className="text-gray-400">
              We maintain no logs and use temporary wallets that are discarded
              after each transaction for maximum privacy.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Security First</h3>
          <p className="max-w-2xl mx-auto text-gray-400">
            Our platform is built with security and privacy as the top priority.
            We use industry-leading encryption and security practices to ensure
            your transactions remain completely private and secure.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
