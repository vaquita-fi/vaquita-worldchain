// mantle.ts
import { defineChain } from 'viem';

export const mantle = defineChain({
  id: 5000,
  name: 'Mantle',
  network: 'mantle',
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [ 'https://rpc.mantle.xyz' ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Explorer',
      url: 'https://explorer.mantle.xyz',
    },
  },
});
