import React, { useState } from 'react'
import { getFactoryContract } from '../utils/contractHelpers'

export default function CreateMarket({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    minStake: ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.title || !form.deadline || !form.minStake) {
      return alert("Fill all required fields")
    }

    try {
      setLoading(true)
      const contract = await getFactoryContract()

      const timestamp = Math.floor(new Date(form.deadline).getTime() / 1000)

      const tx = await contract.createMarket(
        form.title,
        form.description,
        timestamp,
        form.minStake
      )
      await tx.wait()

      alert("Market Created Successfully!")

      setForm({
        title: "",
        description: "",
        deadline: "",
        minStake: ""
      })

      if (onCreated) onCreated()

    } catch (err) {
      console.error(err)
      alert("Transaction Failed")
    }
    setLoading(false)
  }

  return (
    <div className="bg-darkCard p-6 rounded-2xl border border-white/10 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3 text-apmGreen">Create New Market</h2>

      <div className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Prediction Title"
          className="bg-darkBg border border-white/10 p-3 rounded-lg"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Explain the prediction..."
          className="bg-darkBg border border-white/10 p-3 rounded-lg"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="deadline"
          className="bg-darkBg border border-white/10 p-3 rounded-lg"
          value={form.deadline}
          onChange={handleChange}
        />

        <input
          name="minStake"
          placeholder="Minimum Stake (APM)"
          className="bg-darkBg border border-white/10 p-3 rounded-lg"
          value={form.minStake}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="bg-apmGreen text-black px-6 py-2 rounded-lg mt-4 font-bold hover:bg-apmGreen/80 transition"
      >
        {loading ? "Creating..." : "Create Market"}
      </button>
    </div>
  )
}
