import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMarketById,
  getMarketStatus,
  getFactoryOwner,
  claimWinnings,
} from "../utils/contractHelpers";
import StakeModal from "../components/StakeModal";
import ResolvePanel from "../components/ResolvePanel";

export default function MarketDetails() {
  const { id } = useParams();
  const [market, setMarket] = useState(null);
  const [status, setStatus] = useState("");
  const [creator, setCreator] = useState("");
  const [account, setAccount] = useState("");
  const [openStake, setOpenStake] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [details, currentStatus, factoryOwner] = await Promise.all([
        getMarketById(id),
        getMarketStatus(id),
        getFactoryOwner(),
      ]);
      setMarket(details);
      setStatus(currentStatus);
      setCreator(factoryOwner);
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setAccount(accounts[0] || "");
      }
    } catch (err) {
      console.error("Failed to load market:", err);
      setError(err?.shortMessage || err?.message || "Unable to load this market. Check your wallet network and contract configuration.");
    }
  }, [id]);

  useEffect(() => { load(); }, [load, refresh]);

  const refreshMarket = () => setRefresh((value) => value + 1);
  const handleClaim = async () => {
    setClaiming(true);
    try {
      await claimWinnings(id);
      alert("Claim transaction confirmed.");
      refreshMarket();
    } catch (err) {
      console.error(err);
      alert(err?.shortMessage || err?.message || "Claim failed. Check that you have a winning position and have not claimed already.");
    } finally {
      setClaiming(false);
    }
  };

  if (error && !market) {
    return <div className="max-w-3xl mx-auto p-8 text-red-200">{error}</div>;
  }
  if (!market) return <div className="text-center text-white p-10">Loading market...</div>;

  const isOpen = status === "Open";
  const isCreator = Boolean(account && creator && account.toLowerCase() === creator.toLowerCase());

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto text-white">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <span className="px-4 py-2 rounded bg-darkBg/60 border border-white/10">
          Status: <b className="text-apmGold">{status}</b>
        </span>
        <button onClick={refreshMarket} className="text-sm text-apmGold underline">Refresh data</button>
      </div>

      <h1 className="text-3xl font-bold mb-2">{market.question}</h1>
      <p className="text-white/60 mb-4">Market contract: <span className="break-all">{id}</span></p>
      {market.deadline > 0 && (
        <p className="text-sm text-white/60 mb-6">Deadline: {new Date(market.deadline * 1000).toLocaleString()}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button disabled={!isOpen} onClick={() => { setSelectedOutcome("YES"); setOpenStake(true); }}
          className="p-6 bg-darkBg/60 border border-white/10 rounded-xl hover:border-apmGreen transition disabled:opacity-50 disabled:cursor-not-allowed">
          <h3 className="text-xl font-bold text-apmGreen mb-2">YES</h3>
          <p className="text-2xl">{market.yesPrice.toFixed(1)}%</p>
          <p className="text-xs text-white/50 mt-1">Pool share · {market.yesPool.toLocaleString()} APM</p>
        </button>
        <button disabled={!isOpen} onClick={() => { setSelectedOutcome("NO"); setOpenStake(true); }}
          className="p-6 bg-darkBg/60 border border-white/10 rounded-xl hover:border-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <h3 className="text-xl font-bold text-red-400 mb-2">NO</h3>
          <p className="text-2xl">{market.noPrice.toFixed(1)}%</p>
          <p className="text-xs text-white/50 mt-1">Pool share · {market.noPool.toLocaleString()} APM</p>
        </button>
      </div>

      <div className="rounded-xl bg-darkBg/50 border border-white/10 p-4 mb-6">
        <p className="text-white/70">Total pool: <strong className="text-white">{market.totalLiquidity.toLocaleString()} APM</strong></p>
        <p className="text-xs text-white/40 mt-1">Displayed YES/NO percentages are calculated from the current on-chain pools; they are not guaranteed payout odds.</p>
      </div>

      {isCreator && <ResolvePanel marketId={id} status={status} onResolved={refreshMarket} />}
      {status === "Resolved" && account && (
        <div className="mt-6 rounded-xl border border-apmGold/30 bg-apmGold/5 p-5">
          <h3 className="font-semibold mb-2">Winning position?</h3>
          <p className="text-sm text-white/60 mb-3">If your stake is eligible and has not already been claimed, you can claim it from the market contract.</p>
          <button onClick={handleClaim} disabled={claiming} className="px-5 py-2 bg-apmGold text-darkBg rounded font-semibold disabled:opacity-50">
            {claiming ? "Claiming..." : "Claim winnings"}
          </button>
        </div>
      )}

      <StakeModal open={openStake} onClose={() => setOpenStake(false)} outcome={selectedOutcome} marketId={id} onStake={refreshMarket} />
    </div>
  );
}
