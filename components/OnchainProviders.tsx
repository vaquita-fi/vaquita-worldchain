'use client';

import { useWagmiConfig } from '@/web3/hooks';
import { getChainByName } from '@/web3/utils';
// import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import React from 'react';
import * as viemChains from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const network = getChainByName(viemChains, process.env.NEXT_PUBLIC_NETWORK!);

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useWagmiConfig();
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/*<OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={network}>*/}
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
        {/*</OnchainKitProvider>*/}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
