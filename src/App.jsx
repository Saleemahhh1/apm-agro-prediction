import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import GetStartedModal from "./components/GetStartedModal";
import Home from "./pages/Home";
import MarketDetails from "./pages/MarketDetails";
import { auth } from "./utils/Auth";
import { appKit } from "./utils/appKit";
import { setSelectedWalletProvider } from "./utils/walletProvider";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(() => auth.getUser()?.address || null);
  const [authed, setAuthed] = useState(() => Boolean(auth.getUser()));
  const [isBNBPrimary, setIsBNBPrimary] = useState(true);

  const handleConnectWallet = async () => {
    try {
      if (!appKit) {
        alert("Wallet connection is not configured yet. Add VITE_PROJECT_ID in Vercel Environment Variables and redeploy.");
        return;
      }
      if (!appKit) {
        alert("Wallet connection is not configured yet. Add VITE_PROJECT_ID in Vercel Environment Variables.");
        return;
      }
      await appKit.open({ view: "Connect" });
    } catch (error) {
      console.error(error);
      alert(error?.message || "Wallet selector could not be opened.");
    }
  };

  const handleRegister = () => {
    alert("Email registration will be enabled after secure backend authentication is connected.");
  };

  const handleLogout = async () => {
    try { if (appKit) await appKit.disconnect(); } catch (error) { console.warn("Wallet disconnect:", error); }
    auth.logout();
    setAuthed(false);
    setAccount(null);
    setSelectedWalletProvider(null);
    window.location.assign("/");
  };

  useEffect(() => {
    const interval = setInterval(() => setIsBNBPrimary((previous) => !previous), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!appKit) return undefined;
    const unsubscribeAccount = appKit.subscribeAccount((state) => {
      if (state?.isConnected && state?.address) {
        auth.loginWithWallet(state.address);
        setAccount(state.address);
        setAuthed(true);
        setShowModal(false);
      } else {
        auth.logout();
        setAccount(null);
        setAuthed(false);
      }
    });

    const unsubscribeProviders = appKit.subscribeProviders((state) => {
      setSelectedWalletProvider(state?.eip155 || null);
    });

    return () => {
      if (typeof unsubscribeAccount === "function") unsubscribeAccount();
      if (typeof unsubscribeProviders === "function") unsubscribeProviders();
    };
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-white">
      <Header isBNBPrimary={isBNBPrimary} authed={authed} account={account} onConnectWallet={handleConnectWallet} onGetStarted={() => setShowModal(true)} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={authed ? <Home account={account} /> : <Landing onGetStarted={() => setShowModal(true)} />} />
        <Route path="/market/:id" element={<MarketDetails />} />
        <Route path="*" element={<Landing onGetStarted={() => setShowModal(true)} />} />
      </Routes>
      <GetStartedModal open={showModal} onClose={() => setShowModal(false)} onConnectWallet={handleConnectWallet} onRegister={handleRegister} />
    </div>
  );
}
