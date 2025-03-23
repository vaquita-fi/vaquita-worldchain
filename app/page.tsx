'use client';

import { Login } from '@/components/Login';
import Home from '@/vaquita-ui-submodule/components/home/Home';
import { MiniKit } from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

type User = {
  walletAddress: string;
  username: string | null;
  profilePictureUrl: string | null;
};

export default function HomePage() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ user, setUser ] = useState<User | null>(null);
  
  useEffect(() => {
    const checkMiniKit = async () => {
      const isInstalled = MiniKit.isInstalled();
      if (isInstalled) {
        setIsLoading(false);
      } else {
        setTimeout(checkMiniKit, 500);
      }
    };
    
    checkMiniKit();
  }, []);
  
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50">
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-900">
            Loading MiniKit...
          </p>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="w-full max-w-md mx-auto space-y-8 h-full ">
        <section className=" rounded-xl px-2  transition-all">
          <Login setUser={setUser} user={user} />
          {/* <WalletAuth setUser={setUser} user={user}></WalletAuth> */}
        </section>
        {user ? (
          <Home address="0x12" />
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
            <img
              src="/vaquita/cow6-3.png"
              alt="Connect Wallet"
              className="w-48 h-auto"
            />
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Connect Wallet
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
