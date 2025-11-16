import React, { useState } from "react";
import { Auth } from "../utils/Auth";

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("wallet");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask or Binance Wallet");
    try {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      const user = Auth.loginWithWallet(accs[0]);
      onLogin(user);
    } catch (err) {
      console.error(err);
      alert("Wallet connect failed");
    }
  }

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || form.password !== form.confirm)
      return alert("Please fill all fields and confirm password");
    const user = Auth.registerWithEmail(form);
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-darkBg/90 p-6 rounded-xl max-w-lg w-full">
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setTab("wallet")}
            className={tab === "wallet" ? "bg-apmGreen px-4 py-2 rounded" : "px-4 py-2 rounded bg-white/5"}>
            Wallet Login
          </button>
          <button onClick={() => setTab("email")}
            className={tab === "email" ? "bg-apmGreen px-4 py-2 rounded" : "px-4 py-2 rounded bg-white/5"}>
            Email Register
          </button>
        </div>

        {tab === "wallet" ? (
          <div className="text-center">
            <p className="text-white/70 mb-4">Login using MetaMask / Binance Wallet</p>
            <button onClick={connectWallet} className="bg-apmGold text-darkBg px-6 py-2 rounded font-semibold">
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <input className="p-2 bg-white/5 rounded col-span-2" placeholder="Full name"
              value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="p-2 bg-white/5 rounded col-span-2" placeholder="Email"
              value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
            <input type="password" className="p-2 bg-white/5 rounded" placeholder="Password"
              value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} />
            <input type="password" className="p-2 bg-white/5 rounded" placeholder="Confirm"
              value={form.confirm} onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))} />
            <div className="col-span-2 flex justify-end mt-2">
              <button onClick={handleRegister} className="bg-apmGreen px-4 py-2 rounded">Register</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
