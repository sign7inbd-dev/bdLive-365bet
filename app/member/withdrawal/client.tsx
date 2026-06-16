'use client'

import { useState } from 'react'
import { createMemberTransaction } from '@/app/actions/members'
import { useRouter } from 'next/navigation'

export default function WithdrawalClient({ balance }: { balance: number }) {
  const [amount, setAmount] = useState('')
  const [bankAccount, setBankAccount] = useState('')
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

      if (numAmount > balance) {
        setMessage('Insufficient balance')
        setLoading(false)
        return
      }

      if (!bankAccount) {
        setMessage('Please select a bank account')
        setLoading(false)
        return
      }

      await createMemberTransaction(
        'withdrawal',
        numAmount,
        `Withdrawal to bank account ending in ${bankAccount.slice(-4)} - ${new Date().toLocaleDateString()}`
      )

      setMessage('Withdrawal request submitted successfully!')
      setAmount('')
      setTimeout(() => router.push('/member/dashboard'), 2000)
    } catch (error) {
      setMessage('Error processing withdrawal. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Withdraw Funds</h1>
          <p className="text-gray-600 mb-8">Transfer money from your account to your bank</p>

          <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
            <p className="text-blue-900 font-semibold">Available Balance: ${balance.toFixed(2)}</p>
          </div>

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
              <label className="block text-gray-700 font-semibold mb-2">Withdrawal Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Minimum withdrawal: $10</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Bank Account</label>
              <select
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select a bank account</option>
                <option value="XXXX-1234">XXXX-1234 (Primary)</option>
                <option value="XXXX-5678">XXXX-5678 (Savings)</option>
              </select>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Withdrawals are processed within 1-3 business days. You may be asked to verify your identity.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
