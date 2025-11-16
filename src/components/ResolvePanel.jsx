import React, { useState } from "react";
import { resolveMarket } from "../utils/contractHelpers";

export default function ResolvePanel({ marketId, status, onResolved }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  if (status !== "Open")
    return (
      <div className="p-4 bg-darkBg/40 border border-white/10 rounded-xl mt-8">
        <p className="text-white/60">Market is already resolved or closed.</p>
      </div>
    );

  const handleResolve = async () => {
    if (!selected) return alert("Select an outcome");

    setLoading(true);
    try {
      await resolveMarket(marketId, selected);
      setLoading(false);
      onResolved();
    } catch (e) {
      console.error(e);
      setLoading(false);
      alert("Failed to resolve market");
    }
  };

  return (
    <div className="p-6 bg-black/30 border border-white/10 rounded-2xl mt-10">
      <h3 className="text-lg font-bold mb-4">Resolve Market</h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelected("YES")}
          className={`px-4 py-2 rounded border ${
            selected === "YES"
              ? "bg-apmGreen text-darkBg border-apmGreen"
              : "border-white/20 hover:bg-white/10"
          }`}
        >
          YES
        </button>

        <button
          onClick={() => setSelected("NO")}
          className={`px-4 py-2 rounded border ${
            selected === "NO"
              ? "bg-red-500 text-white border-red-500"
              : "border-white/20 hover:bg-white/10"
          }`}
        >
          NO
        </button>
      </div>

      <button
        onClick={handleResolve}
        disabled={loading}
        className="px-5 py-2 bg-apmGold text-darkBg rounded font-semibold hover:bg-yellow-400 disabled:opacity-50"
      >
        {loading ? "Resolving..." : "Confirm Resolution"}
      </button>
    </div>
  );
}
