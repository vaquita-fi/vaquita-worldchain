import { ReactQueryProvider } from '@/app/react-query-provider';
import MiniKitProvider from '@/components/minikit-provider';
import { Web3Provider } from '@/web3/chains/wagmi-provider';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './commons.css';
import './globals.css';
import '@worldcoin/mini-apps-ui-kit-react/styles.css';
// import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/src/sweetalert2.scss';

const OnchainProviders = dynamic(
  () => import('../components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: 'Vaquita',
  description: 'Vaquita',
};

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import('../components/Eruda').then((c) => c.ErudaProvider),
    {
      ssr: false,
    },
  );
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:ital@0;1&family=Rubik:ital,wght@0,300..900;1,300..900&family=Sora:wght@600&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
    <NextUIProvider className="h-full">
      <ReactQueryProvider>
        {/*<NextAuthProvider>*/}
        <OnchainProviders>
          <ErudaProvider>
            <MiniKitProvider>
              <Web3Provider>
                {children}
              </Web3Provider>
            </MiniKitProvider>
          </ErudaProvider>
        </OnchainProviders>
        {/*</NextAuthProvider>*/}
      </ReactQueryProvider>
    </NextUIProvider>
    </body>
    </html>
  );
}
