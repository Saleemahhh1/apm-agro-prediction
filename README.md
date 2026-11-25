# APM-Agro Prediction Market

**Turning Local Insights into Global Intelligence**

APM-Agro is a decentralized agriculture prediction-market frontend built with React, Vite, ethers.js and the BNB Smart Chain testnet. It retains the original dark, green and gold visual identity and the existing public brand assets.

## Current application capabilities

- Wallet connection through injected EVM wallets such as MetaMask and Binance Wallet.
- BNB Testnet chain-ID validation before contract interactions.
- On-chain market discovery through the deployed MarketFactory.
- Market creation using the current MarketFactory ABI.
- YES/NO staking using the PredictionMarket contract and ERC-20 allowance flow.
- Market-owner resolution through the MarketFactory.
- Winner-claim interaction with the PredictionMarket contract.
- Read helpers for APM token balances, vesting positions and liquidity-lock records.
- Manual refresh of on-chain market data.

AI is not permitted to settle markets automatically. Any AI or oracle workflow should produce evidence or a proposed result for an authorized resolver; settlement must remain an explicit, permission-checked on-chain action.

## Technology

- React 18
- Vite 5
- Tailwind CSS 3
- ethers.js 6
- React Router 6
- Framer Motion
- react-globe.gl

## Repository layout

```text
public/                 Brand icons and favicons
src/components/         Existing UI components
src/pages/              Landing, dashboard and market details
src/contract/           Five current contract ABI JSON files
src/utils/              Wallet, contract and formatting helpers
.env.example            Public contract-address configuration template
```

## Local development

1. Install Node.js (18 or newer recommended).
2. Install packages:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in the deployed BNB Testnet addresses.
4. Start the Vite server:

   ```bash
   npm run dev
   ```

5. Create a production build:

   ```bash
   npm run build
   ```

## Required Vercel environment variables

Set these exact public BNB Testnet addresses in Vercel Project Settings → Environment Variables, then redeploy:

| Variable | Value |
| --- | --- |
| `VITE_CHAIN_ID` | `97` |
| `VITE_NETWORK` | `BNB Testnet` |
| `VITE_MARKET_FACTORY_ADDRESS` | `0x6117afc5E1C45008CACDD5B1cD0398e4B0aC10A9` |
| `VITE_APM_TOKEN_ADDRESS` | `0x848eB70e8A8B38BB24310620774aa6d460B20FE8` |
| `VITE_PREDICTION_MARKET_ADDRESS` | `0x6a3956681f06d418c41030364F512be20AB4790e` |
| `VITE_LIQUIDITY_LOCKER_ADDRESS` | `0xDa18616c8c54b7Af6D7A9D5d45D8bcC91C381Cfd` |
| `VITE_VESTING_MANAGER_ADDRESS` | `0xA6D3a37d5291eD907409fc3319855B28c2D3a702` |

The frontend currently discovers individual prediction-market addresses from MarketFactory. The PredictionMarket address variable is retained for explicit configuration and future use.

**Important:** Every variable prefixed with `VITE_` is bundled into browser-visible frontend code. Only public contract addresses and non-sensitive public configuration belong here. Never put private keys, seed phrases, API secrets, database service-role keys or passwords in VITE variables.

## Contract integration notes

The checked-in ABIs are treated as the source of truth for function names and arguments:

- MarketFactory: `getAllMarkets`, `createMarket(question, deadline, feeBps)`, `defaultFeeBps`, and `resolveMarket(market, winningChoice)`.
- PredictionMarket: `question`, `getMarketStatus`, pool getters, `placeBet(choice, amount)`, and `claim()`.
- APMToken: ERC-20 `balanceOf`, `allowance`, `approve`, `decimals` and `symbol`.
- LiquidityLocker: `getLock`, `locksCount`, `lock` and `withdraw`.
- VestingManager: `vestings`, `calculatableVest`, `releaseTokens` and allocation getters.

The market factory ABI stores a question and deadline; it does not expose a description field. The dashboard therefore does not pretend that the optional description input is saved on-chain.

## Authentication status

Wallet connection is supported. The email/password form is a visual placeholder only and does not create authenticated accounts. Production email authentication requires a real provider and server-side configuration.

## Deployment checklist

- Configure all five deployed contract addresses in Vercel.
- Confirm the addresses belong to BNB Testnet (chain ID 97).
- Verify the deployed contracts and owner/treasury permissions.
- Run `npm run build` before deployment.
- Test market creation, token approval, staking, authorized resolution and claiming with test wallets.
- Test the deployed Vercel URL on mobile and desktop.
- Do not enable AI-driven autonomous settlement.

## Live project

- Frontend: https://apm-agro-prediction.vercel.app
- Source: https://github.com/Saleemahhh1/apm-agro-prediction


_Last master-upgrade CI workflow configuration refreshed._
