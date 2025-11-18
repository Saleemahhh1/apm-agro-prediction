## APM-Agro Prediction Market

![APM-Agro Logo](./src/assets/apm-logo.png)

**Decentralized Agriculture Forecasting & Data Democratization built on Binance Smart Chain (BNB Testnet)**

---

## 🚀 Live Demo

- Frontend: [Live on Vercel](https://apm-agro-prediction.vercel.app)  


---

## 🏗️ Project Overview

**APM-Agro** is a **decentralized prediction market** for agriculture, enabling users to:

- Create prediction markets for crop prices or agricultural events
- Stake **APM tokens** on YES/NO outcomes
- Participate in automated, AI-assisted prediction checking
- Receive rewards automatically via smart contracts
- Connect wallets using **MetaMask** or **Binance Wallet**

This project integrates:

- **Smart Contracts:**
  - **APMToken:** [Verified on Sourcify](https://repo.sourcify.dev/97/0x97b619d007ac9fC06109b5162da22603ee316470/)
  - **PredictionMarket:** [Verified on Sourcify](https://repo.sourcify.dev/97/0xdD2A365eaB1692f27C481a78ae7c85b9c303e5D1/)
  - **MarketFactory:** `0xd6a3cfd9653d88fd2a4efe7366bd0a19f74a70e9` (BNB Testnet)

---

## 🖥️ Features

### Landing & Dashboard
- Dark hybrid dashboard with **green & gold theme**  
- **Animated BNB & APM tickers** on landing page  
- “Get Started” button for login/register  

### User Authentication
- **Connect Wallet** (MetaMask / Binance Wallet)  
- **Email & Password Registration**  

### Prediction Market Features
- View all prediction markets (Open / Closed / Resolved)  
- MarketCard shows:
  - Question & description  
  - YES/NO staking prices  
  - Liquidity bar  
  - Live asset price updates  

- **Create Market** (Admin / Authorized user)  
- **Stake APM tokens** on predictions  
- **Resolve market** manually or via AI Assistant  

### AI Assistant
- Fetch live asset prices from Binance API  
- Check if predictions are correct automatically  
- Trigger smart contract payout for winners  
- Runs every 30 seconds  

### Responsive Design & UI/UX
- Fully responsive across desktop, tablet, mobile  
- Interactive hover effects on cards and buttons  
- Professional color theme: green, gold, dark background  

---

## ⚙️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **State Management:** React useState / useEffect  
- **Smart Contracts Integration:** ethers.js  
- **Blockchain:** Binance Smart Chain (BNB Testnet)  
- **API:** Binance public API for live asset prices  
- **Deployment:** Vercel / Netlify  

---

## 📁 Project Structure

APM-agro-starter/ │ ├─ package.json ├─ vite.config.js ├─ tailwind.config.js ├─ postcss.config.js ├─ index.html ├─ README.md ├─ .env.example │ ├─ public/ │   └─ (icons/favicons) │ └─ src/ ├─ App.jsx ├─ main.jsx ├─ index.css │ ├─ components/ │   ├─ Header.jsx │   ├─ MarketCard.jsx │   ├─ CreateMarket.jsx │   ├─ ResolvePanel.jsx │   ├─ StakeModal.jsx │   └─ WalletButton.jsx │ ├─ pages/ │   ├─ Home.jsx │   └─ MarketDetails.jsx │ ├─ contracts/ │   ├─ MarketFactory.json │   ├─ Market.json │   └─ APMToken.json │ ├─ utils/ │   ├─ contractHelpers.js │   └─ aiAssistant.js │ └─ assets/ └─ screenshots/ ├─ mint_tokens.png ├─ create_market.png ├─ place_bet.png └─ reward.png

---

## ⚡ Getting Started

1. Clone repo:
```bash
git clone https://github.com/YourUsername/APM-agro.git
cd APM-agro

2. Install dependencies:



npm install

3. Add environment variables:



cp .env.example .env
# Edit .env with deployed contract addresses

4. Run development server:



npm run dev

5. Build for production:



npm run build

6. Deploy to Vercel or Netlify:



Build folder: dist/

Set environment variables in hosting platform



---

🔗 Smart Contract Addresses (BNB Testnet)

Contract	Address

MarketFactory	0xd6a3cfd9653d88fd2a4efe7366bd0a19f74a70e9
PredictionMarket	0xdD2A365eaB1692f27C481a78ae7c85b9c303e5D1
APMToken	0x97b619d007ac9fC06109b5162da22603ee316470



---

🛠️ Features Screenshots







---

🎯 Future Improvements

Add multi-chain support

Integrate Chainlink oracle for real-time price feeds

Enhance AI prediction logic with ML models

Enable notifications for prediction results



---

🙏 Acknowledgements

Built for Hackathon submission

Inspired by decentralized finance & prediction market platforms

Special thanks to friends & mentors who guided the process

---

📝 APM-Agro Hackathon Submission Note

Project Name: APM-Agro Prediction Market
Team / Developer: Alamin Muhammad (solo / team name)
Hackathon: [Insert Hackathon Name]
Submission Date: [Insert Date]


---

🌐 Live Frontend

https://apm-agro.vercel.app
(Frontend deployed on Vercel, fully functional, responsive, and connected to BNB Testnet)


---

🔗 Smart Contracts (BNB Testnet)

Contract	Address	Verified Link

MarketFactory	0xd6a3cfd9653d88fd2a4efe7366bd0a19f74a70e9	N/A
PredictionMarket	0xdD2A365eaB1692f27C481a78ae7c85b9c303e5D1	Sourcify
APMToken	0x97b619d007ac9fC06109b5162da22603ee316470	Sourcify


Network: Binance Smart Chain – Testnet


---

🏗️ Project Overview

APM-Agro is a decentralized agriculture prediction market, designed to:

Enable users to create, participate, and stake predictions on agricultural events (crop prices, market trends).

Automate reward distribution using AI-assisted prediction checking.

Provide live asset price updates from Binance API for accurate market resolutions.

Offer wallet connection via MetaMask or Binance Wallet.

Support registration/login with email & password for hackathon demo purposes.


Key Goal: Turn local agricultural insights into global intelligence while empowering users with decentralized forecasting and token-based participation.


---

⚡ Features

Landing Page: Animated BNB/APM tickers, Get Started button, hybrid dark-green-gold theme

User Authentication: Wallet connect + email/password registration

Prediction Markets: View all markets (Open/Closed/Resolved), stake APM tokens, create markets

AI Assistant: Auto-check predictions against live prices, trigger payouts automatically

Live Prices: Fetches real-time prices from Binance API every 15 seconds

Responsive Design: Desktop, tablet, mobile, professional UI/UX



---

📁 Project Structure

APM-agro-starter/
├─ package.json
├─ vite.config.js
├─ src/
│   ├─ App.jsx
│   ├─ main.jsx
│   ├─ components/
│   ├─ pages/
│   ├─ contracts/
│   ├─ utils/
│   └─ assets/screenshots/


---

🛠️ Tech Stack

Frontend: React + Vite + Tailwind CSS

Blockchain: Binance Smart Chain (BNB Testnet)

Smart Contracts: Solidity (APMToken, MarketFactory, PredictionMarket)

Integration: ethers.js for frontend interaction

API: Binance public API for live asset prices



---

📸 Screenshots (Optional)

Mint tokens: 

Create market: 

Place bet: 

Rewards: 



---

🎯 Future Improvements

Multi-chain support (Ethereum, Polygon)

Chainlink oracle integration for secure price feeds

Enhanced AI prediction with ML models

User notifications & email alerts



---

✅ Submission Notes

Frontend live URL tested

Smart contracts verified on Sourcify

All features demoed on BNB Testnet

No private keys exposed

Ready for hackathon evaluation


---

📄 License

MIT License

---
