"use client";
import { MiniKit, WalletAuthInput } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const walletAuthInput = (nonce: string): WalletAuthInput => {
  return {
    nonce,
    requestId: "0",
    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    statement:
      "This is my statement and here is a link https://worldcoin.com/apps",
  };
};

type User = {
  walletAddress: string;
  username: string | null;
  profilePictureUrl: string | null;
};

export const Login = ({ user, setUser }: any) => {
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(
        walletAuthInput(nonce)
      );

      if (finalPayload.status === "error") {
        setLoading(false);
        return;
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: finalPayload,
            nonce,
          }),
        });

        if (response.status === 200) {
          setUser(MiniKit.user);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative flex flex-row items-center justify-between">
      {/* LOGO */}
      <Link className="flex gap-1" href={"/"}>
        <Image src="/1-1.png" alt="Groups Active" width={30} height={15} />
        <span className="text-2xl text-center flex align-center items-center sm:text-xl">
          Vaquita
        </span>
      </Link>

      {!user ? (
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Connecting..." : "Login"}
        </Button>
      ) : (
        <div className="relative">
          {/* PERFIL DEL USUARIO */}
          <Button
            className="flex flex-col items-center space-y-2 cursor-pointer "
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            variant="primary"
          >
            <div className="flex items-center space-x-2 ">
              <span className="font-medium">
                {user?.username ||
                  user?.walletAddress.slice(0, 6) +
                    "..." +
                    user?.walletAddress.slice(-4)}
              </span>
            </div>
          </Button>

          {/* POPUP DE LOGOUT */}
          {isPopupOpen && (
            <div
              className="absolute left-0 mt-1 w-32 bg-white shadow-lg rounded-lg border border-gray-200 p-3 z-50 flex justify-center"
              onMouseLeave={() => setIsPopupOpen(false)} // Se cierra al salir
            >
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="md"
                disabled={loading}
                className=""
              >
                {loading ? "Signing Out..." : "Sign Out"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
