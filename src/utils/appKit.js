import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bscTestnet } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: "APM-Agro Prediction Market",
  description: "Decentralized agriculture prediction market",
  url: typeof window !== "undefined" ? window.location.origin : "https://apm-agro-prediction.com",
  icons: ["https://apm-agro-prediction.com/favicon.ico"]
};

// Do not crash the entire React app if Vercel has not yet received VITE_PROJECT_ID.
// Wallet connection stays disabled with a clear error until the variable is configured.
export const appKit = projectId
  ? createAppKit({
      adapters: [new EthersAdapter()],
      networks: [bscTestnet],
      projectId,
      metadata,
      defaultNetwork: bscTestnet,
      features: { analytics: true },
      themeMode: "dark",
      themeVariables: {
        "--w3m-accent": "#b9a34a",
        "--w3m-color-mix": "#101812",
        "--w3m-color-mix-strength": 35
      }
    })
  : null;

export function isWalletKitConfigured() {
  return Boolean(appKit);
}
