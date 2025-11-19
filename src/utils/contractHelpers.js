// ✔ Ethers v6 import
import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";

import MarketFactoryJSON from "../contract/MarketFactory.json";
import MarketJSON from "../contract/PredictionMarket.json";
import APMTokenJSON from "../contract/APMToken.json";

// Replace with your deployed addresses
const MARKET_FACTORY_ADDRESS = "0xd6a3cfd9653d88fd2a4efe7366bd0a19f74a70e9";
const APM_TOKEN_ADDRESS = "0x97b619d007ac9fC06109b5162da22603ee316470";

let provider;
let signer;
let marketFactoryContract;
let apmTokenContract;

export const initContracts = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask or Binance Wallet");

  provider = new BrowserProvider(window.ethereum);
  signer = await provider.getSigner();

  marketFactoryContract = new Contract(
    MARKET_FACTORY_ADDRESS,
    MarketFactoryJSON.abi,
    signer
  );

  apmTokenContract = new Contract(
    APM_TOKEN_ADDRESS,
    APMTokenJSON.abi,
    signer
  );
};

// =============== GET ALL MARKETS =================
export const allMarkets = async () => {
  await initContracts();

  const marketAddresses = await marketFactoryContract.allMarkets();

  const markets = await Promise.all(
    marketAddresses.map(async (addr) => {
      const marketContract = new Contract(addr, MarketJSON.abi, signer);

      const question = await marketContract.question();
      const description = await marketContract.description();
      const yesPrice = Number(formatUnits(await marketContract.yesPrice(), 18));
      const noPrice = Number(formatUnits(await marketContract.noPrice(), 18));
      const totalLiquidity = Number(
        formatUnits(await marketContract.totalLiquidity(), 18)
      );

      const liquidityPercentage =
        totalLiquidity > 0
          ? Math.min(100, (totalLiquidity / 1000) * 100)
          : 0;

      const status = await marketContract.status();

      return {
        id: addr,
        question,
        description,
        yesPrice,
        noPrice,
        totalLiquidity,
        liquidityPercentage,
        status,
      };
    })
  );

  return markets;
};

// =============== GET MARKET BY ID =================
export const getMarketById = async (marketId) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);

  const question = await marketContract.question();
  const description = await marketContract.description();
  const yesPrice = Number(formatUnits(await marketContract.yesPrice(), 18));
  const noPrice = Number(formatUnits(await marketContract.noPrice(), 18));
  const totalLiquidity = Number(
    formatUnits(await marketContract.totalLiquidity(), 18)
  );
  const status = await marketContract.status();
  const creator = await marketContract.creator();

  return {
    id: marketId,
    question,
    description,
    yesPrice,
    noPrice,
    totalLiquidity,
    status,
    creator,
  };
};

// ================= STAKE ==================
export const stakeOnMarket = async (marketId, outcome, amount) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);
  const value = parseUnits(amount.toString(), 18);

  const tx = await marketContract.stake(outcome === "YES", value);
  await tx.wait();
};

// ================= RESOLVE ==================
export const resolveMarket = async (marketId, outcome) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);
  const tx = await marketContract.resolve(outcome === "YES");
  await tx.wait();
};

// =============== PRICES =================
export const getOutcomePrices = async (marketId) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);

  const yesPrice = Number(formatUnits(await marketContract.yesPrice(), 18));
  const noPrice = Number(formatUnits(await marketContract.noPrice(), 18));

  return { yes: yesPrice, no: noPrice };
};

// =============== STATUS =================
export const getMarketStatus = async (marketId) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);
  return await marketContract.status();
};

// =============== CREATOR =================
export const getMarketCreator = async (marketId) => {
  await initContracts();

  const marketContract = new Contract(marketId, MarketJSON.abi, signer);
  return await marketContract.creator();
};
