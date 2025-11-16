import React, { useState } from "react";
import { stakeOnMarket } from "../utils/contractHelpers";

export default function StakeModal({ open, onClose, marketId, outcome, onStake }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleStake = async () => {
    if (!amount || Number(amount) <= 0)
      return alert("Enter a valid amount");

    setLoading(true);
    try {
      await stakeOnMarket(marketId, outcome, amount);
      setLoading(false);
      onStake();
      onClose();
    } catch (e) {
      console.error(e);
      setLoading(false);
      alert("Transaction failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-darkBg p-6 rounded-2xl border border-white/10 w-[90%] max-w-md">

        <h2 className="text-xl font-bold mb-4">
          Stake on <span className="text-apmGold">{outcome}</span>
        </h2>

        {/* Amount Input */}
        <input
          type="number"
          className="w-full px-4 py-2 rounded bg-black/30 border border-white/10 text-white mb-4"
          placeholder="Amount (APM)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 rounded hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleStake}
            disabled={loading}
            className="px-4 py-2 bg-apmGreen rounded hover:bg-apmGreen/80 text-darkBg font-semibold disabled:opacity-40"
          >
            {loading ? "Processing..." : "Confirm Stake"}
          </button>
        </div>
      </div>
    </div>
  );
}
