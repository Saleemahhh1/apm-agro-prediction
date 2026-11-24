import React, { useState } from "react";
import { createMarket } from "../utils/contractHelpers";

export default function CreateMarket({ onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.deadline) return alert("Enter a question and deadline.");
    const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
    if (!Number.isFinite(deadline) || deadline <= Math.floor(Date.now() / 1000)) return alert("Deadline must be in the future.");

    setLoading(true);
    try {
      await createMarket({ question: form.title.trim(), deadline });
      alert("Market created successfully on-chain.");
      setForm({ title: "", description: "", deadline: "" });
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert(error?.shortMessage || error?.message || "Market creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-darkCard p-6 rounded-2xl border border-white/10 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3 text-apmGreen">Create New Market</h2>
      <div className="flex flex-col gap-3">
        <input name="title" placeholder="Prediction question" className="bg-darkBg border border-white/10 p-3 rounded-lg" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Optional notes (not stored by the current smart contract)" className="bg-darkBg border border-white/10 p-3 rounded-lg" value={form.description} onChange={handleChange} />
        <input type="datetime-local" name="deadline" className="bg-darkBg border border-white/10 p-3 rounded-lg" value={form.deadline} onChange={handleChange} />
        <p className="text-xs text-white/50">The deployed MarketFactory ABI stores the question, deadline and configured fee. It has no on-chain description field.</p>
      </div>
      <button disabled={loading} onClick={handleSubmit} className="bg-apmGreen text-black px-6 py-2 rounded-lg mt-4 font-bold hover:bg-apmGreen/80 transition disabled:opacity-50">
        {loading ? "Creating..." : "Create Market"}
      </button>
    </div>
  );
}
