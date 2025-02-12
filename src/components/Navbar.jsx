import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar({ onWalletSelect }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const connectPhantom = async () => {
    try {
      if (typeof window.solana !== 'undefined') {
        const resp = await window.solana.connect();
        const address = resp.publicKey.toString();
        setWalletAddress(address);
        setWalletType('phantom');
        setConnected(true);
        onWalletSelect(address);
        setShowWalletOptions(false);
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Phantom connection error:', error);
    }
  };

  const connectSolflare = async () => {
    try {
      if (typeof window.solflare !== 'undefined') {
        const resp = await window.solflare.connect();
        const address = resp.publicKey.toString();
        setWalletAddress(address);
        setWalletType('solflare');
        setConnected(true);
        onWalletSelect(address);
        setShowWalletOptions(false);
      } else {
        window.open('https://solflare.com/', '_blank');
      }
    } catch (error) {
      console.error('Solflare connection error:', error);
    }
  };

  const disconnect = async () => {
    try {
      if (walletType === 'phantom' && window.solana) {
        await window.solana.disconnect();
      } else if (walletType === 'solflare' && window.solflare) {
        await window.solflare.disconnect();
      }
      setConnected(false);
      setWalletAddress('');
      setWalletType(null);
      onWalletSelect('');
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const menuItems = [
    { title: 'Start', href: '#' },
    { title: 'About', href: '#about' }
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    }
  };

  // Check for existing wallet connections on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.solana?.isConnected) {
        const address = window.solana.publicKey.toString();
        setWalletAddress(address);
        setWalletType('phantom');
        setConnected(true);
        onWalletSelect(address);
      } else if (window.solflare?.isConnected) {
        const address = window.solflare.publicKey.toString();
        setWalletAddress(address);
        setWalletType('solflare');
        setConnected(true);
        onWalletSelect(address);
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full z-50 top-0 left-0"
    >
      <div className="backdrop-blur-md bg-black/30 border-b border-pink-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <motion.span 
                className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
                whileHover={{ scale: 1.05 }}
              >
                SOLANA MIXER
              </motion.span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  className="text-gray-300 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.title}
                </motion.a>
              ))}
              
              {/* Wallet Button */}
              <div className="relative">
                {!connected ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowWalletOptions(!showWalletOptions)}
                    className="animated-btn px-4 py-2 rounded-full text-white font-medium flex items-center space-x-2"
                  >
                    <FaWallet />
                    <span>Connect Wallet</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={disconnect}
                    className="bg-gray-800 px-4 py-2 rounded-full text-white font-medium flex items-center space-x-2"
                  >
                    <FaWallet className="text-pink-500" />
                    <span>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                  </motion.button>
                )}

                {/* Wallet Options Dropdown */}
                <AnimatePresence>
                  {showWalletOptions && !connected && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <button
                          onClick={connectPhantom}
                          className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 text-left"
                        >
                          Phantom Wallet
                        </button>
                        <button
                          onClick={connectSolflare}
                          className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 text-left"
                        >
                          Solflare Wallet
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-pink-500"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-gray-900/95 backdrop-blur-md"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-gray-300 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                
                {/* Mobile Wallet Button */}
                <div className="px-3 py-2">
                  {!connected ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowWalletOptions(!showWalletOptions)}
                      className="w-full animated-btn px-4 py-2 rounded-full text-white font-medium flex items-center justify-center space-x-2"
                    >
                      <FaWallet />
                      <span>Connect Wallet</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={disconnect}
                      className="w-full bg-gray-800 px-4 py-2 rounded-full text-white font-medium flex items-center justify-center space-x-2"
                    >
                      <FaWallet className="text-pink-500" />
                      <span>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                    </motion.button>
                  )}

                  {/* Mobile Wallet Options */}
                  <AnimatePresence>
                    {showWalletOptions && !connected && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 rounded-md bg-gray-800"
                      >
                        <button
                          onClick={connectPhantom}
                          className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-center"
                        >
                          Phantom Wallet
                        </button>
                        <button
                          onClick={connectSolflare}
                          className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-center"
                        >
                          Solflare Wallet
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
