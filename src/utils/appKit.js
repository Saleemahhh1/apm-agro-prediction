import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bscTestnet } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
  throw new Error("VITE_PROJECT_ID is missing. Add the Reown Project ID to Vercel Environment Variables.");
}

const metadata = {
  name: "APM-Agro Prediction Market",
  description: "Decentralized agriculture prediction market",
  url: typeof window !== "undefined" ? window.location.origin : "https://apm-agro-prediction.vercel.app",
  icons: ["https://apm-agro-prediction.vercel.app/favicon.ico"]
};

export const appKit = createAppKit({
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
});
