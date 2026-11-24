import React, { useCallback, useEffect, useState } from "react";
import { allMarkets } from "../utils/contractHelpers";
import MarketCard from "../components/MarketCard";
import CreateMarket from "../components/CreateMarket";

export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchMarkets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setMarkets(await allMarkets());
    } catch (err) {
      console.error("Failed to fetch markets:", err);
      setError(err?.shortMessage || err?.message || "Unable to load markets. Connect a wallet on BNB Testnet and verify the contract environment variables.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const filteredMarkets = filter === "All"
    ? markets
    : markets.filter((market) => market.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <CreateMarket onCreated={fetchMarkets} />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Prediction Markets</h1>
        <button onClick={fetchMarkets} disabled={loading} className="px-4 py-2 rounded-lg border border-apmGold/50 text-apmGold disabled:opacity-50">
          {loading ? "Refreshing..." : "Refresh markets"}
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Open", "Closed", "Resolved"].map((value) => (
          <button key={value} onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded ${filter === value ? "bg-apmGreen text-darkBg" : "bg-darkBg/50 text-white/70"}`}>
            {value}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-center text-white/60">Loading markets from BNB Testnet...</p>
      ) : error ? (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-5 text-red-100">
          <p>{error}</p>
          <button onClick={fetchMarkets} className="mt-3 underline">Try again</button>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <p className="text-center text-white/60">No markets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => <MarketCard key={market.id} market={market} />)}
        </div>
      )}
    </div>
  );
}
