import React from "react";
import { short } from "../utils/format";
import { connectMetaMask } from "../utils/walletProvider";

export default function WalletButton({ account, onConnect }) {
  async function connect() {
    try {
      const { account: address } = await connectMetaMask();
      onConnect?.(address);
    } catch (error) {
      console.error(error);
      alert(error?.message || "MetaMask connection failed");
    }
  }

  return (
    <button onClick={connect} className="bg-white text-darkBg px-4 py-2 rounded">
      {account ? short(account) : "Connect MetaMask"}
    </button>
  );
}
