import React from 'react'

export default function RotatingGlobe(){
  return (
    <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-apmGold/20 to-transparent border border-white/6 relative">
      <svg className="w-24 h-24 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="url(#g)" strokeWidth="1.6" strokeOpacity="0.9"/>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#d4af37"/>
            <stop offset="100%" stopColor="#ffd77a"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-2 text-xs text-white/60">Global insights</div>
    </div>
  )
}
