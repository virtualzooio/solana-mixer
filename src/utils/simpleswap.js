import axios from 'axios';
import { SIMPLESWAP_API_URL } from './constants';

const API_KEY = import.meta.env.VITE_SIMPLESWAP_API_KEY;

class SimpleSwapAPI {
  constructor() {
    this.api = axios.create({
      baseURL: SIMPLESWAP_API_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getOptimalSwapPath(amount) {
    try {
      const [pairs, rates] = await Promise.all([
        this.api.get('/get_pairs'),
        this.api.get('/get_estimated')
      ]);

      const paths = [
        { from: 'SOL', via: 'XRP', to: 'SOL' },
        { from: 'SOL', via: 'XLM', to: 'SOL' },
        { from: 'SOL', via: 'ALGO', to: 'SOL' }
      ];

      const pathsWithFees = await Promise.all(
        paths.map(async (path) => {
          const firstSwapRate = await this.getRate(path.from, path.via, amount);
          const secondSwapRate = await this.getRate(path.via, path.to, firstSwapRate.expectedAmount);

          return {
            ...path,
            totalFee: firstSwapRate.fee + secondSwapRate.fee,
            estimatedTime: firstSwapRate.time + secondSwapRate.time,
            expectedAmount: secondSwapRate.expectedAmount
          };
        })
      );

      return pathsWithFees.sort((a, b) => a.totalFee - b.totalFee)[0];
    } catch (error) {
      console.error('Error finding optimal swap path:', error);
      throw error;
    }
  }

  async getRate(fromCurrency, toCurrency, amount) {
    try {
      const response = await this.api.get('/get_estimated', {
        params: {
          from: fromCurrency,
          to: toCurrency,
          amount: amount
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting rate:', error);
      throw error;
    }
  }

  async createSwap(fromCurrency, toCurrency, amount, recipientAddress) {
    try {
      const response = await this.api.post('/create_exchange', {
        fixed: true,
        currency_from: fromCurrency,
        currency_to: toCurrency,
        amount: amount,
        address_to: recipientAddress,
        extra_id: null
      });
      return response.data;
    } catch (error) {
      console.error('Error creating swap:', error);
      throw error;
    }
  }

  async getSwapStatus(swapId) {
    try {
      const response = await this.api.get(`/get_exchange?id=${swapId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting swap status:', error);
      throw error;
    }
  }
}

export default new SimpleSwapAPI();
