import React, { useState } from 'react'

export default function GetStartedModal({ open, onClose, onConnectWallet, onRegister }) {
  const [tab, setTab] = useState('wallet') // 'wallet' or 'email'
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' })

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl p-6 rounded-lg bg-darkBg/95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Get Started</h3>
          <button onClick={onClose} className="text-white/60">Close</button>
        </div>

        <div className="flex gap-4 mb-4">
          <button onClick={()=>setTab('wallet')} className={tab==='wallet' ? 'bg-apmGreen px-4 py-2 rounded' : 'px-4 py-2 rounded bg-white/5'}>Connect Wallet</button>
          <button onClick={()=>setTab('email')} className={tab==='email' ? 'bg-apmGreen px-4 py-2 rounded' : 'px-4 py-2 rounded bg-white/5'}>Register with Email</button>
        </div>

        {tab === 'wallet' ? (
          <div>
            <p className="text-white/70 mb-3">Connect with MetaMask or Binance Wallet to sign in.</p>
            <div className="flex gap-3">
              <button onClick={onConnectWallet} className="bg-apmGold text-darkBg px-4 py-2 rounded">Connect Wallet</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <input className="p-2 rounded bg-white/5 col-span-2" placeholder="Full name"
                   value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
            <input className="p-2 rounded bg-white/5 col-span-2" placeholder="Email"
                   value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
            <input className="p-2 rounded bg-white/5" placeholder="Password" type="password"
                   value={form.password} onChange={e=>setForm(f=>({...f, password:e.target.value}))} />
            <input className="p-2 rounded bg-white/5" placeholder="Confirm" type="password"
                   value={form.confirm} onChange={e=>setForm(f=>({...f, confirm:e.target.value}))} />
            <div className="col-span-2 flex justify-end mt-2">
              <button onClick={()=> onRegister(form)} className="bg-apmGreen px-4 py-2 rounded">Register</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
