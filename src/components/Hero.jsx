import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaRandom, FaWallet, FaShieldAlt, FaExchangeAlt, FaBolt } from 'react-icons/fa';
import { Connection } from '@solana/web3.js';
import { MixerService } from '../utils/mixer';
import { NETWORKS } from '../utils/constants';
import Navbar from './Navbar';

export default function Hero() {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [mixingLevel, setMixingLevel] = useState('medium');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState('');

  const features = [
    {
      icon: <FaRandom />,
      title: "MULTI-HOP",
      description: "Bis zu 7 Hops über verschiedene Wallets"
    },
    {
      icon: <FaExchangeAlt />,
      title: "CROSS-CHAIN",
      description: "Automatischer Swap über XRP/XLM/ALGO"
    },
    {
      icon: <FaBolt />,
      title: "INSTANT",
      description: "Schnelle Ausführung & beste Routen"
    },
    {
      icon: <FaShieldAlt />,
      title: "ANONYM",
      description: "Zero Knowledge & No Logs"
    }
  ];

  const handleWalletSelect = (address) => {
    setConnectedWallet(address);
    if (address) {
      setWalletAddress(address);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connectedWallet) {
      setStatus('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setStatus('Initiating mixing process...');

    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const mixer = new MixerService(connection);
      
      const config = {
        low: { hops: 3, split: false },
        medium: { hops: 5, split: true },
        high: { hops: 7, split: true }
      }[mixingLevel];

      setStatus('Generating secure wallets...');
      const result = await mixer.executeMix({
        amount: parseFloat(amount),
        destinationAddress: walletAddress,
        hops: config.hops,
        splitTransactions: config.split
      });

      setStatus('Transaction complete! Funds have been mixed and sent.');
    } catch (error) {
      setStatus('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar onWalletSelect={handleWalletSelect} />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 sexy-gradient opacity-20"></div>
        
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4}px`,
                height: `${Math.random() * 4}px`,
                background: 'white',
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <span className="text-stroke block mb-2 sm:mb-4">SOLANA</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              MIXER
            </span>
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
            {/* Mixer Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-pink-500 mb-2">Amount (SOL)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-800 border border-pink-500/20 rounded-lg p-3 text-white focus:border-pink-500 transition-colors"
                    placeholder="Enter amount..."
                    step="0.1"
                    min="0.1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-pink-500 mb-2">Destination Wallet</label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-gray-800 border border-pink-500/20 rounded-lg p-3 text-white focus:border-pink-500 transition-colors"
                    placeholder="Solana wallet address..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-pink-500 mb-2">Mixing Level</label>
                  <select
                    value={mixingLevel}
                    onChange={(e) => setMixingLevel(e.target.value)}
                    className="w-full bg-gray-800 border border-pink-500/20 rounded-lg p-3 text-white focus:border-pink-500 transition-colors"
                  >
                    <option value="low">Basic (3 hops)</option>
                    <option value="medium">Advanced (5 hops + split)</option>
                    <option value="high">Maximum (7 hops + split)</option>
                  </select>
                </div>

                {status && (
                  <div className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-pink-500'} mt-2`}>
                    {status}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-lg text-white font-bold ${
                    !connectedWallet ? 'bg-gray-700' : 'animated-btn'
                  }`}
                  type="submit"
                  disabled={isLoading || !connectedWallet}
                >
                  {!connectedWallet 
                    ? 'Connect Wallet to Start' 
                    : isLoading 
                      ? 'Mixing in Progress...' 
                      : 'Start Mixing'}
                </motion.button>

                <div className="text-xs text-gray-500 text-center mt-4">
                  Estimated fees: {mixingLevel === 'low' ? '0.5%' : mixingLevel === 'medium' ? '0.75%' : '1%'}
                </div>
              </form>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-pink-500 text-3xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}

              {/* Cross-Chain Info */}
              <motion.div
                className="col-span-2 bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4 text-pink-500">Supported Chains</h3>
                <div className="grid grid-cols-4 gap-4">
                  {Object.values(NETWORKS).map((network) => (
                    <div key={network.symbol} className="text-center">
                      <div className="text-2xl mb-2">{network.symbol}</div>
                      <div className="text-xs text-gray-400">{network.name}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
