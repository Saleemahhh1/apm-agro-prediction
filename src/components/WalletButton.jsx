import React, { useState } from "react";
import { short } from "../utils/format";

export default function WalletButton({ account: connectedAccount, onConnect }) {
  const [localAccount, setLocalAccount] = useState(null);
  const account = connectedAccount || localAccount;

  async function connect() {
    if (!window.ethereum) return alert("Please install MetaMask or Binance Wallet");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setLocalAccount(accounts[0]);
      onConnect?.(accounts[0]);
    } catch (error) {
      console.error(error);
      alert(error?.message || "Wallet connection failed");
    }
  }

  return <button onClick={connect} className="bg-white text-darkBg px-4 py-2 rounded">{account ? short(account) : "Connect Wallet"}</button>;
}
