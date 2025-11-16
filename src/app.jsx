import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Landing from './pages/Landing'
import GetStartedModal from './components/GetStartedModal'
import Home from './pages/Home'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [route, setRoute] = useState('landing') // 'landing' | 'home'
  const [account, setAccount] = useState(null)

  const openGetStarted = () => setShowModal(true)
  const closeGetStarted = () => setShowModal(false)

  // ✅ connect wallet logic
  const handleConnectWallet = async () => {
    if (!window.ethereum) return alert('Install MetaMask or Binance Wallet')
    try {
      const accs = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accs[0])
      setAuthed(true)
      setRoute('home')
      setShowModal(false)
    } catch (e) {
      console.error(e)
      alert('Connection failed')
    }
  }

  // ✅ simple email/password registration (stub)
  const handleRegister = (form) => {
    if (!form.email || !form.name || form.password !== form.confirm)
      return alert('Please complete form & ensure passwords match')
    setAuthed(true)
    setRoute('home')
    setShowModal(false)
  }

  // ✅ logout
  const handleLogout = () => {
    setAuthed(false)
    setAccount(null)
    setRoute('landing')
  }

  // Dynamic header color switcher
  const [isBNBPrimary, setIsBNBPrimary] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBNBPrimary(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-darkBg text-white">
      <Header
        isBNBPrimary={isBNBPrimary}
        authed={authed}
        onGetStarted={openGetStarted}
        onLogout={handleLogout}
        setRoute={setRoute}
      />

      {route === 'landing' && <Landing onGetStarted={openGetStarted} />}
      {route === 'home' && <Home account={account} />}

      <GetStartedModal
        open={showModal}
        onClose={closeGetStarted}
        onConnectWallet={handleConnectWallet}
        onRegister={handleRegister}
      />
    </div>
  )
}
