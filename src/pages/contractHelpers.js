import { ethers } from "ethers";
import MarketFactoryJSON from "../contracts/MarketFactory.json";
import MarketJSON from "../contracts/Market.json";
import APMTokenJSON from "../contracts/APMToken.json";

// Replace with your deployed addresses
const MARKET_FACTORY_ADDRESS = "0xd6a3cfd9653d88fd2a4efe7366bd0a19f74a70e9";
const APM_TOKEN_ADDRESS = "0x97b619d007ac9fC06109b5162da22603ee316470";

let provider;
let signer;
let marketFactoryContract;
let apmTokenContract;

export const initContracts = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask or Binance Wallet");
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  marketFactoryContract = new ethers.Contract(
    MARKET_FACTORY_ADDRESS,
    MarketFactoryJSON.abi,
    signer
  );

  apmTokenContract = new ethers.Contract(
    APM_TOKEN_ADDRESS,
    APMTokenJSON.abi,
    signer
  );
};

// Fetch all markets
export const getAllMarkets = async () => {
  await initContracts();
  const marketAddresses = await marketFactoryContract.allMarkets();
  const markets = await Promise.all(
    marketAddresses.map(async (addr) => {
      const marketContract = new ethers.Contract(addr, MarketJSON.abi, signer);
      const question = await marketContract.question();
      const description = await marketContract.description();
      const yesPrice = Number(ethers.utils.formatUnits(await marketContract.yesPrice(), 18));
      const noPrice = Number(ethers.utils.formatUnits(await marketContract.noPrice(), 18));
      const totalLiquidity = Number(ethers.utils.formatUnits(await marketContract.totalLiquidity(), 18));
      const liquidityPercentage = totalLiquidity > 0 ? Math.min(100, (totalLiquidity / 1000) * 100) : 0;
      const status = await marketContract.status(); // assuming string: Open/Closed/Resolved

      return { id: addr, question, description, yesPrice, noPrice, totalLiquidity, liquidityPercentage, status };
    })
  );
  return markets;
};

// Fetch market by ID
export const getMarketById = async (marketId) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  const question = await marketContract.question();
  const description = await marketContract.description();
  const yesPrice = Number(ethers.utils.formatUnits(await marketContract.yesPrice(), 18));
  const noPrice = Number(ethers.utils.formatUnits(await marketContract.noPrice(), 18));
  const totalLiquidity = Number(ethers.utils.formatUnits(await marketContract.totalLiquidity(), 18));
  const status = await marketContract.status();
  const creator = await marketContract.creator();

  return { id: marketId, question, description, yesPrice, noPrice, totalLiquidity, status, creator };
};

// Stake
export const stakeOnMarket = async (marketId, outcome, amount) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  const value = ethers.utils.parseUnits(amount.toString(), 18);
  const tx = await marketContract.stake(outcome === "YES", value);
  await tx.wait();
};

// Resolve
export const resolveMarket = async (marketId, outcome) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  const tx = await marketContract.resolve(outcome === "YES");
  await tx.wait();
};

// Get outcome prices for MarketDetails.jsx
export const getOutcomePrices = async (marketId) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  const yesPrice = Number(ethers.utils.formatUnits(await marketContract.yesPrice(), 18));
  const noPrice = Number(ethers.utils.formatUnits(await marketContract.noPrice(), 18));
  return { yes: yesPrice, no: noPrice };
};

// Get Market Status
export const getMarketStatus = async (marketId) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  return await marketContract.status();
};

// Get Market Creator
export const getMarketCreator = async (marketId) => {
  await initContracts();
  const marketContract = new ethers.Contract(marketId, MarketJSON.abi, signer);
  return await marketContract.creator();
};
