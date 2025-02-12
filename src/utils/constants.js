export const NETWORKS = {
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    minAmount: 0.1,
    maxAmount: 1000
  },
  XRP: {
    name: 'Ripple',
    symbol: 'XRP',
    decimals: 6,
    minAmount: 10,
    maxAmount: 100000
  },
  XLM: {
    name: 'Stellar',
    symbol: 'XLM',
    decimals: 7,
    minAmount: 50,
    maxAmount: 500000
  },
  ALGO: {
    name: 'Algorand',
    symbol: 'ALGO',
    decimals: 6,
    minAmount: 10,
    maxAmount: 100000
  }
};

export const MIXING_LEVELS = {
  low: {
    hops: 3,
    splits: false,
    fee: 0.5,
    time: '~5 minutes'
  },
  medium: {
    hops: 5,
    splits: true,
    fee: 0.75,
    time: '~8 minutes'
  },
  high: {
    hops: 7,
    splits: true,
    fee: 1,
    time: '~12 minutes'
  }
};

export const SIMPLESWAP_API_URL = 'https://api.simpleswap.io/v1';
export const SOLANA_NETWORK = 'mainnet-beta';
