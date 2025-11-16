import React, { useState } from 'react'
import { short } from '../utils/format'

export default function WalletButton(){
  const [account, setAccount] = useState(null)

  async function connect(){
    if (!window.ethereum) return alert('Please install MetaMask or Binance Wallet')
    const accs = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accs[0])
  }

  return (
    <button onClick={connect} className="bg-white text-darkBg px-4 py-2 rounded">
      { account ? short(account) : 'Connect Wallet' }
    </button>
  )
}
