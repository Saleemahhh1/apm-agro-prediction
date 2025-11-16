import React, { useEffect, useState } from "react";
import { getAllMarkets } from "../utils/contractHelpers";
import MarketCard from "../components/MarketCard";
import { checkPredictionAndResolve } from "../utils/aiAssistant";

export default function Home() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Fetch markets
  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const data = await getAllMarkets();
      setMarkets(data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch markets");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarkets();

    // AI Assistant auto-check every 30s
    const interval = setInterval(async () => {
      for (let market of markets) {
        if (market.status === "Open") {
          await checkPredictionAndResolve(
            market.id,
            market.assetSymbol || "MAIZEUSDT", // replace with real
            market.targetPrice || 110, // replace with real target
            market.outcome || "YES"
          );
        }
      }
      // Refresh markets after AI check
      await fetchMarkets();
    }, 30000);

    return () => clearInterval(interval);
  }, [markets]);

  const filteredMarkets =
    filter === "All"
      ? markets
      : markets.filter((m) => m.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Prediction Markets</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["All", "Open", "Closed", "Resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-apmGreen text-darkBg" : "bg-darkBg/50 text-white/70"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Market Cards */}
      {loading ? (
        <p className="text-center text-white/60">Loading markets...</p>
      ) : filteredMarkets.length === 0 ? (
        <p className="text-center text-white/60">No markets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      )}
    </div>
  );
}
