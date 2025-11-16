import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Globe from "react-globe.gl";

export default function Landing({ onGetStarted }) {
  const [isBNBPrimary, setIsBNBPrimary] = useState(true);

  // color swap effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBNBPrimary((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-black to-yellow-900 text-white">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-800/20 via-transparent to-yellow-600/20 blur-3xl" />

      {/* 🌿 Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-bold tracking-wide mb-3">
          <span className={isBNBPrimary ? "text-bnbYellow" : "text-apmGreen"}>
            APM
          </span>
          <span className="text-white/70">-</span>
          <span className={!isBNBPrimary ? "text-bnbYellow" : "text-apmGreen"}>
            agro
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-lg sm:text-xl text-white/80 mb-6"
        >
          Decentralized agriculture forecasting and data democratization
          <br />
          <span className="text-bnbYellow/90">Built on Binance Smart Chain</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-sm sm:text-base italic text-white/70"
        >
          Turning local insights into global intelligence 🌍
        </motion.p>
      </motion.div>

      {/* 🌍 Rotating Globe */}
      <motion.div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 z-0 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <Globe
          width={400}
          height={400}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          showAtmosphere={true}
          atmosphereColor="#FFD700"
          atmosphereAltitude={0.2}
        />
      </motion.div>

      {/* 🌟 Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="z-10 mt-16"
      >
        <button
          onClick={onGetStarted}
          className="bg-apmGold text-darkBg px-8 py-3 rounded-xl font-semibold text-lg hover:bg-apmGold/90 transition transform hover:scale-105 shadow-lg shadow-yellow-500/30"
        >
          Get Started
        </button>
      </motion.div>

      {/* 🔻 Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 10, 0] }}
        transition={{
          delay: 2,
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 flex flex-col items-center text-white/60 text-sm"
      >
        <span>Scroll down</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>

      {/* 🔄 Animated tickers */}
      <div className="absolute top-6 right-8 flex items-center gap-3 z-10">
        <Ticker symbol="BNB" active={isBNBPrimary} />
        <Ticker symbol="APM" active={!isBNBPrimary} />
      </div>
    </div>
  );
}

// 🔹 Ticker component
function Ticker({ symbol, active }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.5, scale: active ? 1.05 : 1 }}
      transition={{ duration: 0.8 }}
      className={`px-3 py-1 rounded border border-white/10 flex items-center gap-2 ${
        active ? "bg-white/10 shadow-md" : "bg-transparent"
      }`}
    >
      <span
        className={`font-semibold ${
          symbol === "BNB"
            ? active
              ? "text-bnbYellow"
              : "text-white/70"
            : active
            ? "text-apmGreen"
            : "text-white/70"
        }`}
      >
        {symbol}
      </span>
      <span className="text-xs text-white/60">
        {symbol === "BNB" ? "₿ 597" : "A 0.0042"}
      </span>
    </motion.div>
  );
}
