import { ReactQueryProvider } from '@/app/react-query-provider';
import MiniKitProvider from '@/components/minikit-provider';
import NextAuthProvider from '@/components/next-auth-provider';
import { Web3Provider } from '@/web3/wagmi-provider';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Sora } from 'next/font/google';
import './commons.css';
import './globals.css';
import '@worldcoin/mini-apps-ui-kit-react/styles.css';

const sora = Sora({ subsets: [ 'latin' ] });

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
    <body className={sora.className}>
    <NextUIProvider className="h-full">
      <ReactQueryProvider>
        <NextAuthProvider>
          <ErudaProvider>
            <MiniKitProvider>
              <Web3Provider>
                {children}
              </Web3Provider>
            </MiniKitProvider>
          </ErudaProvider>
        </NextAuthProvider>
      </ReactQueryProvider>
    </NextUIProvider>
    </body>
    </html>
  );
}
