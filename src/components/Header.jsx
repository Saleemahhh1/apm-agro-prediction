import React from 'react'
import clsx from 'clsx'
import WalletButton from './WalletButton'

export default function Header({ isBNBPrimary, authed, onGetStarted, onLogout }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-darkBg/70 backdrop-blur-md sticky top-0 z-50">
      {/* 🌿 Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-apmGreen/30 to-bnbYellow/20 flex items-center justify-center border border-white/10">
            <span className="text-xl">🌿</span>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold tracking-wide">
              <span className={clsx(isBNBPrimary ? 'text-bnbYellow' : 'text-apmGreen')}>
                APM
              </span>
              <span className="text-white/70">-</span>
              <span className={clsx(!isBNBPrimary ? 'text-bnbYellow' : 'text-apmGreen')}>
                agro
              </span>
            </h1>
            <p className="text-xs text-white/60">
              decentralized agriculture forecasting
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Right Side (Tickers + Button) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Show BNB only before login */}
          {!authed && <Ticker isBNBPrimary={isBNBPrimary} symbol="BNB" />}
          <Ticker isBNBPrimary={!isBNBPrimary} symbol="APM" />
        </div>

        {/* Action Button */}
        {!authed ? (
          <button
            onClick={onGetStarted}
            className="bg-apmGold text-darkBg px-4 py-2 rounded font-semibold hover:bg-apmGold/90 transition"
          >
            Get Started
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="bg-transparent border border-apmGold text-apmGold px-4 py-2 rounded font-semibold hover:bg-apmGold/20 transition"
          >
            Logout
          </button>
        )}

        {/* Wallet Connect Button (still shows when logged in) */}
        <WalletButton />
      </div>
    </header>
  )
}

function Ticker({ isBNBPrimary, symbol }) {
  const cls = isBNBPrimary ? 'text-white scale-105' : 'text-white/70'
  return (
    <div
      className={`px-3 py-1 rounded flex items-center gap-2 border border-white/10 ${
        isBNBPrimary ? 'animate-pulse' : ''
      }`}
    >
      <div className={cls}>{symbol}</div>
      <div className="text-xs text-white/60">123.45</div>
    </div>
  )
}
