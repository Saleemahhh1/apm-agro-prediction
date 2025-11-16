import React from 'react'
import clsx from 'clsx'

export default function AnimatedTicker({ symbol = 'BNB', isPrimary = false }) {
  return (
    <div className={clsx(
      'flex items-center gap-2 px-3 py-1 rounded-lg border border-white/6',
      isPrimary ? 'bg-white/6 scale-105 pulse' : 'bg-transparent'
    )}>
      <div className={clsx(isPrimary ? 'text-white' : 'text-white/70', 'font-bold')}>{symbol}</div>
      <div className="text-xs text-white/60">123.45</div>
    </div>
  )
}
