'use client';

import { createConfig, http } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import * as wagmiChains from 'wagmi/chains';
import { getChainByName } from '../web3/utils/crypto';
const chain = getChainByName(wagmiChains, process.env.NEXT_PUBLIC_NETWORK ?? '');

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  return createConfig({
    chains: [chain],
    connectors: [
      metaMask(),
    ],
    ssr: true,
    transports: {
      [chain.id]: http(process.env.NEXT_PUBLIC_RPC_URL ?? ''),
    }
  });
}