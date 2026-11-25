let selectedWalletProvider = null;

export function setSelectedWalletProvider(provider) {
  selectedWalletProvider = provider || null;
}

export function getActiveWalletProvider() {
  return selectedWalletProvider;
}

// Legacy fallback helper; new connections should use the AppKit wallet selector.
export function getMetaMaskProvider() {
  if (selectedWalletProvider) return selectedWalletProvider;
  if (typeof window === "undefined" || !window.ethereum) return null;
  const injected = window.ethereum;
  const providers = Array.isArray(injected.providers) ? injected.providers : [injected];
  return providers.find((provider) => provider.isMetaMask && !provider.isBinanceWallet)
    || providers.find((provider) => provider.isMetaMask)
    || null;
}
