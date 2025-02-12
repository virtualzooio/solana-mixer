import { Connection, PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import SimpleSwapAPI from './simpleswap';
import { MIXING_LEVELS } from './constants';

export class MixerService {
  constructor(connection) {
    this.connection = connection;
    this.simpleSwap = SimpleSwapAPI;
  }

  async generateWallets(count) {
    return Array(count).fill(0).map(() => Keypair.generate());
  }

  async createHopTransaction(fromWallet, toWallet, amount, splitAmount = false) {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromWallet.publicKey,
          toPubkey: toWallet.publicKey,
          lamports: splitAmount ? amount / 2 : amount,
        })
      );

      transaction.feePayer = fromWallet.publicKey;
      const blockhash = await this.connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash.blockhash;

      return transaction;
    } catch (error) {
      console.error('Error creating hop transaction:', error);
      throw error;
    }
  }

  async waitForSwapConfirmation(swapId, timeout = 300000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const status = await this.simpleSwap.getSwapStatus(swapId);
      if (status.status === 'finished') return true;
      if (status.status === 'failed') throw new Error('Swap failed');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
    throw new Error('Swap timeout');
  }

  async executeMix({
    amount,
    destinationAddress,
    hops = 5,
    splitTransactions = true
  }) {
    try {
      const hopWallets = await this.generateWallets(hops);
      const transactions = [];
      let currentAmount = amount;

      // First set of hops
      for (let i = 0; i < Math.floor(hops/2); i++) {
        const fromWallet = i === 0 ? userWallet : hopWallets[i-1];
        const toWallet = hopWallets[i];
        
        if (splitTransactions) {
          const tx1 = await this.createHopTransaction(fromWallet, toWallet, currentAmount * 0.6);
          const tx2 = await this.createHopTransaction(fromWallet, toWallet, currentAmount * 0.4);
          transactions.push(tx1, tx2);
        } else {
          const tx = await this.createHopTransaction(fromWallet, toWallet, currentAmount);
          transactions.push(tx);
        }
      }

      // Cross-chain swap
      const swapPath = await this.simpleSwap.getOptimalSwapPath(currentAmount);
      const midWallet = hopWallets[Math.floor(hops/2)];
      
      const firstSwap = await this.simpleSwap.createSwap(
        'SOL',
        swapPath.via,
        currentAmount,
        midWallet.publicKey.toString()
      );

      await this.waitForSwapConfirmation(firstSwap.id);

      const secondSwap = await this.simpleSwap.createSwap(
        swapPath.via,
        'SOL',
        firstSwap.expectedAmount,
        hopWallets[Math.floor(hops/2) + 1].publicKey.toString()
      );

      await this.waitForSwapConfirmation(secondSwap.id);

      // Final set of hops
      for (let i = Math.floor(hops/2) + 1; i < hops; i++) {
        const fromWallet = hopWallets[i];
        const toWallet = i === hops - 1 ? new PublicKey(destinationAddress) : hopWallets[i+1];
        
        if (splitTransactions) {
          const tx1 = await this.createHopTransaction(fromWallet, toWallet, currentAmount * 0.7);
          const tx2 = await this.createHopTransaction(fromWallet, toWallet, currentAmount * 0.3);
          transactions.push(tx1, tx2);
        } else {
          const tx = await this.createHopTransaction(fromWallet, toWallet, currentAmount);
          transactions.push(tx);
        }
      }

      return {
        success: true,
        transactions,
        hopWallets,
        swaps: {
          first: firstSwap,
          second: secondSwap
        },
        finalAmount: secondSwap.expectedAmount
      };

    } catch (error) {
      console.error('Mixing error:', error);
      throw error;
    }
  }
}
