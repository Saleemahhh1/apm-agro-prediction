import React from "react";
import { short } from "../utils/format";
import { appKit } from "../utils/appKit";

export default function WalletButton({ account }) {
  async function handleClick() {
    try {
      await appKit.open({ view: "Connect" });
    } catch (error) {
      console.error(error);
      alert(error?.message || "Wallet selector could not be opened.");
    }
  }

  return (
    <button onClick={handleClick} className="bg-white text-darkBg px-4 py-2 rounded">
      {account ? short(account) : "Connect Wallet"}
    </button>
  );
}
