import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMarketById,
  getOutcomePrices,
  getMarketStatus,
  getMarketCreator,
} from "../utils/contractHelpers";

import StakeModal from "../components/StakeModal";
import ResolvePanel from "../components/ResolvePanel";

export default function MarketDetails() {
  const { id } = useParams();

  const [market, setMarket] = useState(null);
  const [prices, setPrices] = useState({ yes: 0, no: 0 });
  const [status, setStatus] = useState("");
  const [creator, setCreator] = useState("");
  const [openStake, setOpenStake] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const m = await getMarketById(id);
        const p = await getOutcomePrices(id);
        const st = await getMarketStatus(id);
        const cr = await getMarketCreator(id);

        setMarket(m);
        setPrices(p);
        setStatus(st);
        setCreator(cr);
      } catch (e) {
        console.error("Failed to load market:", e);
      }
    };

    load();
  }, [id, refresh]);

  if (!market) return <div className="text-center text-white p-10">Loading...</div>;

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto text-white">

      {/* MARKET TITLE */}
      <h1 className="text-3xl font-bold mb-2">{market.question}</h1>
      <p className="text-white/60 mb-4">{market.description}</p>

      {/* STATUS */}
      <div className="mb-6">
        <span className="px-4 py-2 rounded bg-darkBg/60 border border-white/10">
          Status: <b className="text-apmGold">{status}</b>
        </span>
      </div>

      {/* PRICES SECTION */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* YES */}
        <button
          onClick={() => {
            setSelectedOutcome("YES");
            setOpenStake(true);
          }}
          className="p-6 bg-darkBg/60 border border-white/10 rounded-xl hover:border-apmGreen transition"
        >
          <h3 className="text-xl font-bold text-apmGreen mb-2">YES</h3>
          <p className="text-2xl">{prices.yes} APM</p>
        </button>

        {/* NO */}
        <button
          onClick={() => {
            setSelectedOutcome("NO");
            setOpenStake(true);
          }}
          className="p-6 bg-darkBg/60 border border-white/10 rounded-xl hover:border-red-400 transition"
        >
          <h3 className="text-xl font-bold text-red-400 mb-2">NO</h3>
          <p className="text-2xl">{prices.no} APM</p>
        </button>
      </div>

      {/* RESOLVE PANEL (only for creator) */}
      {window.ethereum?.selectedAddress?.toLowerCase() === creator.toLowerCase() && (
        <ResolvePanel
          marketId={id}
          status={status}
          onResolved={() => setRefresh(!refresh)}
        />
      )}

      {/* STAKE MODAL */}
      <StakeModal
        open={openStake}
        onClose={() => setOpenStake(false)}
        outcome={selectedOutcome}
        marketId={id}
        onStake={() => setRefresh(!refresh)}
      />
    </div>
  );
}
