import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import GetStartedModal from "./components/GetStartedModal";
import Home from "./pages/Home";
import MarketDetails from "./pages/MarketDetails";
import { auth } from "./utils/Auth";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(() => auth.getUser()?.address || null);
  const [authed, setAuthed] = useState(() => Boolean(auth.getUser()));
  const [isBNBPrimary, setIsBNBPrimary] = useState(true);

  const handleConnectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask or Binance Wallet");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      auth.loginWithWallet(accounts[0]);
      setAccount(accounts[0]);
      setAuthed(true);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert(error?.message || "Wallet connection failed");
    }
  };

  const handleRegister = () => {
    alert("Email registration is not active yet. Please connect your wallet.");
  };

  const handleLogout = () => {
    auth.logout();
    setAuthed(false);
    setAccount(null);
    window.location.assign("/");
  };

  useEffect(() => {
    const interval = setInterval(() => setIsBNBPrimary((previous) => !previous), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return undefined;
    const handleAccountsChanged = (accounts) => {
      if (!accounts.length) {
        auth.logout();
        setAccount(null);
        setAuthed(false);
      } else {
        auth.loginWithWallet(accounts[0]);
        setAccount(accounts[0]);
        setAuthed(true);
      }
    };
    window.ethereum.on?.("accountsChanged", handleAccountsChanged);
    return () => window.ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-white">
      <Header isBNBPrimary={isBNBPrimary} authed={authed} account={account} onConnectWallet={(address) => { auth.loginWithWallet(address); setAccount(address); setAuthed(true); }} onGetStarted={() => setShowModal(true)} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={authed ? <Home account={account} /> : <Landing onGetStarted={() => setShowModal(true)} />} />
        <Route path="/market/:id" element={<MarketDetails />} />
        <Route path="*" element={<Landing onGetStarted={() => setShowModal(true)} />} />
      </Routes>
      <GetStartedModal open={showModal} onClose={() => setShowModal(false)} onConnectWallet={handleConnectWallet} onRegister={handleRegister} />
    </div>
  );
}
