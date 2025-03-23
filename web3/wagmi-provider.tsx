'use client';

import { createConfig, http, WagmiConfig } from 'wagmi';
import { mantle } from './mantle';

export const config = createConfig({
  chains: [ mantle ],
  transports: {
    [mantle.id]: http('https://rpc.mantle.xyz'),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
