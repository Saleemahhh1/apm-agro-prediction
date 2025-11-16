import axios from "axios";
import { resolveMarket } from "./contractHelpers";

/**
 * AI Assistant function
 * @param {string} marketId - smart contract address
 * @param {string} assetSymbol - e.g. "MAIZEUSDT"
 * @param {number} targetPrice
 * @param {string} outcome - "YES" if predicting price will reach target
 */
export const checkPredictionAndResolve = async (marketId, assetSymbol, targetPrice, outcome) => {
  try {
    // 1. Get current price from Binance API
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${assetSymbol}`);
    const currentPrice = parseFloat(res.data.price);

    console.log(`Current ${assetSymbol} price: ${currentPrice}, Target: ${targetPrice}`);

    // 2. Check prediction
    let predictionWin = false;
    if (outcome === "YES" && currentPrice >= targetPrice) predictionWin = true;
    if (outcome === "NO" && currentPrice < targetPrice) predictionWin = true;

    // 3. Resolve market if predictionWin
    if (predictionWin) {
      console.log(`Prediction correct! Resolving market ${marketId}...`);
      await resolveMarket(marketId, outcome);
      console.log("Market resolved and rewards distributed.");
    } else {
      console.log("Prediction not yet correct, waiting...");
    }

    return predictionWin;
  } catch (e) {
    console.error("AI Assistant error:", e);
    return false;
  }
};
