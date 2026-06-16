'use client'

import { useState } from 'react'
import { createMemberTransaction } from '@/app/actions/members'
import { useRouter } from 'next/navigation'

export default function DepositClient() {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('bank')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const numAmount = parseFloat(amount)
      if (numAmount <= 0) {
        setMessage('Please enter a valid amount')
        setLoading(false)
        return
      }

      await createMemberTransaction(
        'deposit',
        numAmount,
        `Deposit via ${method} - ${new Date().toLocaleDateString()}`
      )

      setMessage('Deposit request submitted successfully! Please wait for approval.')
      setAmount('')
      setTimeout(() => router.push('/member/dashboard'), 2000)
    } catch (error) {
      setMessage('Error processing deposit. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Deposit Funds</h1>
          <p className="text-gray-600 mb-8">Add money to your account</p>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.includes('successfully')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Deposit Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Minimum deposit: $10</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'bank', label: 'Bank Transfer' },
                  { value: 'card', label: 'Credit/Debit Card' },
                  { value: 'wallet', label: 'Digital Wallet' },
                  { value: 'crypto', label: 'Cryptocurrency' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition" style={{borderColor: method === opt.value ? '#3b82f6' : '#e5e7eb'}}>
                    <input
                      type="radio"
                      name="method"
                      value={opt.value}
                      checked={method === opt.value}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Your deposit will be pending approval. It typically takes 1-2 hours for deposits to be processed.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Processing...' : 'Request Deposit'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Amounts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
