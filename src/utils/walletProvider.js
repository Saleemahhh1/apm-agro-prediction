// Select MetaMask explicitly when multiple wallet extensions inject providers.
export function getMetaMaskProvider() {
  if (typeof window === "undefined" || !window.ethereum) return null;
  const injected = window.ethereum;
  const providers = Array.isArray(injected.providers) ? injected.providers : [injected];
  return providers.find((provider) => provider.isMetaMask && !provider.isBinanceWallet)
    || providers.find((provider) => provider.isMetaMask)
    || null;
}

export async function connectMetaMask() {
  const provider = getMetaMaskProvider();
  if (!provider) {
    throw new Error("MetaMask was not detected. Please install or enable the MetaMask extension, then refresh APM Agro.");
  }
  const accounts = await provider.request({ method: "eth_requestAccounts" });
  if (!accounts?.length) throw new Error("No MetaMask account was selected.");
  return { provider, account: accounts[0] };
}
