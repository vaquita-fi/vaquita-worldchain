"use client";

import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { VerifyBlock } from "@/components/Verify";
import { PayBlock } from "@/components/Pay";
import { WalletAuth } from "@/components/WalletAuth";
import { Login } from "@/components/Login";
import CowAnimation from "@/vaquita-ui-submodule/components/CowAnimation/CowAnimation";
import Link from "next/link";

type User = {
  walletAddress: string;
  username: string | null;
  profilePictureUrl: string | null;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
          <div className=" flex flex-col justify-around gap-4 h-full ">
            <div className="flex gap-2 h-full">
              <div className="px-6 py-8 shadow-lg rounded-2xl border-t-2 border-r-2 border-l-2 border-b-4 border-black w-1/2">
                <div className="flex flex-wrap justify-center items-center h-full p-0 m-0 gap-2">
                  <img
                    src="/images/vault.png"
                    alt="Vault Icon"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-base font-bold">1M USDC</p>
                    <p className="text-sm text-gray-500">Total Staked</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 shadow-lg rounded-2xl border-t-2 border-r-2 border-l-2 border-b-4 border-black bg-transparent w-1/2">
                <div className="flex flex-wrap justify-center items-center h-full p-0 m-0 gap-2">
                  <img
                    src="/images/yield.png"
                    alt="Yield Icon"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-base font-bold">±5% + 2%</p>
                    <p className="text-sm text-gray-500">100K USDC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-16">
              <CowAnimation estado={6} intervalo={500} />
            </div>

            <div className="gap-2 flex flex-row ">
              <div className="px-6 py-8 shadow-lg rounded-2xl border-black border-t-2 border-r-2 border-l-2 border-b-4 bg-transparent w-1/2">
                <div className="flex flex-wrap justify-center items-center h-full p-0 m-0 gap-2">
                  <img
                    src="/images/volume.png"
                    alt="Total Saved"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-base font-bold">300 USDC</p>
                    <p className="text-sm text-gray-500">Total Saved</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 shadow-lg rounded-2xl  border-black border-t-2 border-r-2 border-l-2 border-b-4 bg-transparent w-1/2">
                <div className="flex flex-wrap justify-center items-center h-full p-0 m-0 gap-2">
                  <img
                    src="/images/flame.png"
                    alt="Days Left"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-base font-bold">85 days</p>
                    <p className="text-sm text-gray-500">95 days left</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={"/more"}
              className="px-6 py-8 shadow-lg rounded-2xl  border-black border-t-2 border-r-2 border-l-2 border-b-4 bg-transparent w-full"
            >
              <div className="flex flex-wrap justify-center items-center h-full p-0 m-0 gap-2">
                <div>
                  <p className="text-base font-bold">More about vaquita</p>
                </div>
              </div>
            </Link>

            {/* <section className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Payment
              </h2>
              <PayBlock />
            </section> */}
          </div>
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
