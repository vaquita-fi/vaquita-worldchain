'use client';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { coinbaseWallet, metaMaskWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { createConfig, http } from 'wagmi';
import * as wagmiChains from 'wagmi/chains';
import { mantle } from '../chains/mantle';
import { PUBLIC_NETWORK, RPC_URL, WC_PROJECT_ID } from '../config/constants';
import { getChainByName } from '../utils';

const chain = getChainByName(wagmiChains, PUBLIC_NETWORK);

export function useWagmiConfig() {
  
  const projectId = WC_PROJECT_ID ?? '';
  
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }
  
  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [
            metaMaskWallet,
            rainbowWallet,
            coinbaseWallet,
            walletConnectWallet,
          ],
        },
      ],
      {
        appName: 'Vaquita',
        projectId,
      },
    );
    
    const wagmiConfig = createConfig({
      chains: [ mantle ],
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [mantle.id]: http(RPC_URL || 'https://rpc.mantle.xyz'),
      },
    });
    
    return wagmiConfig;
  }, [ projectId ]);
}
