import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";

import MarketFactoryABI from "../contract/MarketFactory.json";
import PredictionMarketABI from "../contract/PredictionMarket.json";
import APMTokenABI from "../contract/APMToken.json";
import LiquidityLockerABI from "../contract/LiquidityLocker.json";
import VestingManagerABI from "../contract/VestingManager.json";
import { getActiveWalletProvider } from "./walletProvider";

const addresses = {
  factory: import.meta.env.VITE_MARKET_FACTORY_ADDRESS || import.meta.env.VITE_MARKET_FACTORY,
  token: import.meta.env.VITE_APM_TOKEN_ADDRESS || import.meta.env.VITE_APM_TOKEN,
  predictionMarket: import.meta.env.VITE_PREDICTION_MARKET_ADDRESS || import.meta.env.VITE_PREDICTION_MARKET,
  liquidityLocker: import.meta.env.VITE_LIQUIDITY_LOCKER_ADDRESS || import.meta.env.VITE_LIQUIDITY_LOCKER,
  vestingManager: import.meta.env.VITE_VESTING_MANAGER_ADDRESS || import.meta.env.VITE_VESTING_MANAGER,
};

let provider;
let signer;

async function getWalletContext() {
  const injectedProvider = getActiveWalletProvider();
  if (!injectedProvider) throw new Error("Connect a wallet first using the APM Agro wallet selector.");
  provider = new BrowserProvider(injectedProvider);
  signer = await provider.getSigner();

  const expectedChainId = Number(import.meta.env.VITE_CHAIN_ID || 97);
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== expectedChainId) {
    throw new Error(`Wrong network. Please switch your wallet to chain ID ${expectedChainId}.`);
  }
  return { provider, signer };
}

function requireAddress(value, label) {
  if (!value) throw new Error(`${label} address is missing. Configure its VITE_ environment variable in Vercel.`);
  return value;
}

async function getContract(address, abi, label) {
  const { signer: activeSigner } = await getWalletContext();
  return new Contract(requireAddress(address, label), abi, activeSigner);
}

export const getFactoryContract = () =>
  getContract(addresses.factory, MarketFactoryABI, "Market Factory");

export const getTokenContract = () =>
  getContract(addresses.token, APMTokenABI, "APM Token");

export const getLiquidityLockerContract = () =>
  getContract(addresses.liquidityLocker, LiquidityLockerABI, "Liquidity Locker");

export const getVestingManagerContract = () =>
  getContract(addresses.vestingManager, VestingManagerABI, "Vesting Manager");

async function getMarketContract(marketAddress) {
  if (!marketAddress) throw new Error("Market address is required.");
  const { signer: activeSigner } = await getWalletContext();
  return new Contract(marketAddress, PredictionMarketABI, activeSigner);
}

function normalizeStatus(status) {
  const value = String(status).toLowerCase();
  if (value.includes("resolv")) return "Resolved";
  if (value.includes("clos") || value.includes("expir")) return "Closed";
  return "Open";
}

async function readMarket(marketAddress) {
  const market = await getMarketContract(marketAddress);
  const tokenAddress = await market.token();
  const token = new Contract(tokenAddress, APMTokenABI, await getWalletContext().then(x => x.signer));
  const decimals = Number(await token.decimals());
  const [question, statusText, yesPoolRaw, noPoolRaw, totalPoolRaw, deadline, creator] =
    await Promise.all([
      market.question(),
      market.getMarketStatus(),
      market.getYesPool(),
      market.getNoPool(),
      market.getTotalPool(),
      market.deadline(),
      market.owner(),
    ]);

  const yesPool = Number(formatUnits(yesPoolRaw, decimals));
  const noPool = Number(formatUnits(noPoolRaw, decimals));
  const totalLiquidity = Number(formatUnits(totalPoolRaw, decimals));
  const total = yesPool + noPool;

  return {
    id: marketAddress,
    question,
    description: "",
    yesPrice: total > 0 ? (yesPool / total) * 100 : 50,
    noPrice: total > 0 ? (noPool / total) * 100 : 50,
    totalLiquidity,
    liquidityPercentage: total > 0 ? 100 : 0,
    status: normalizeStatus(statusText),
    creator,
    deadline: Number(deadline),
    yesPool,
    noPool,
  };
}

export const allMarkets = async () => {
  const factory = await getFactoryContract();
  const marketAddresses = await factory.getAllMarkets();
  return Promise.all(marketAddresses.map(readMarket));
};

export const getMarketById = readMarket;

export const getOutcomePrices = async (marketId) => {
  const market = await readMarket(marketId);
  return { yes: market.yesPrice, no: market.noPrice };
};

export const getMarketStatus = async (marketId) => {
  const market = await getMarketContract(marketId);
  return normalizeStatus(await market.getMarketStatus());
};

export const getMarketCreator = async (marketId) => {
  const market = await getMarketContract(marketId);
  return market.owner();
};

export const getFactoryOwner = async () => {
  const factory = await getFactoryContract();
  return factory.owner();
};

export const stakeOnMarket = async (marketId, outcome, amount) => {
  const market = await getMarketContract(marketId);
  const tokenAddress = await market.token();
  const { signer: activeSigner } = await getWalletContext();
  const token = new Contract(tokenAddress, APMTokenABI, activeSigner);
  const decimals = Number(await token.decimals());
  const value = parseUnits(String(amount), decimals);
  if (value <= 0n) throw new Error("Stake amount must be greater than zero.");

  const account = await activeSigner.getAddress();
  const currentAllowance = await token.allowance(account, marketId);
  if (currentAllowance < value) {
    const approval = await token.approve(marketId, value);
    await approval.wait();
  }

  const yesValue = await market.YES();
  const noValue = await market.NO();
  const choice = outcome === "YES" ? yesValue : noValue;
  const tx = await market.placeBet(choice, value);
  return tx.wait();
};

export const resolveMarket = async (marketId, outcome) => {
  const factory = await getFactoryContract();
  const market = await getMarketContract(marketId);
  const choice = outcome === "YES" ? await market.YES() : await market.NO();
  const tx = await factory.resolveMarket(marketId, choice);
  return tx.wait();
};

export const createMarket = async ({ question, deadline }) => {
  const factory = await getFactoryContract();
  const feeBps = await factory.defaultFeeBps();
  const tx = await factory.createMarket(question, BigInt(deadline), feeBps);
  return tx.wait();
};

export const getContractAddresses = () => ({ ...addresses });

export const claimWinnings = async (marketId) => {
  const market = await getMarketContract(marketId);
  const tx = await market.claim();
  return tx.wait();
};

export const getTokenBalance = async (walletAddress) => {
  const token = await getTokenContract();
  const { signer: activeSigner } = await getWalletContext();
  const address = walletAddress || await activeSigner.getAddress();
  const [balance, decimals, symbol] = await Promise.all([
    token.balanceOf(address),
    token.decimals(),
    token.symbol(),
  ]);
  return { balance: formatUnits(balance, decimals), symbol };
};

export const getVestingPosition = async (beneficiary) => {
  const manager = await getVestingManagerContract();
  const [position, claimable, outstanding] = await Promise.all([
    manager.vestings(beneficiary),
    manager.calculatableVest(beneficiary),
    manager.totalOutstanding(),
  ]);
  return { position, claimable, outstanding };
};

export const getLiquidityLock = async (lockId) => {
  const locker = await getLiquidityLockerContract();
  return locker.getLock(lockId);
};
