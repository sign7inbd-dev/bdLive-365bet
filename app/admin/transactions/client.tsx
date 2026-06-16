'use client'

import { useState } from 'react'
import { approveTransaction, rejectTransaction } from '@/app/actions/admin'
import { useRouter } from 'next/navigation'

interface Transaction {
  id: string
  userId: string
  memberId: string
  transactionType: string
  amount: number
  status: string
  description: string
  createdAt: Date
}

export default function AdminTransactionsClient({
  pendingTransactions,
}: {
  pendingTransactions: Transaction[]
}) {
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('pending')
  const router = useRouter()

  const handleApprove = async (transactionId: string) => {
    setLoading(transactionId)
    try {
      await approveTransaction(transactionId)
      router.refresh()
    } catch (error) {
      console.error('Error approving transaction:', error)
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (transactionId: string) => {
    setLoading(transactionId)
    try {
      await rejectTransaction(transactionId, 'Rejected by admin')
      router.refresh()
    } catch (error) {
      console.error('Error rejecting transaction:', error)
    } finally {
      setLoading(null)
    }
  }

  const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  )

  const pendingAmount = pendingTransactions.reduce((sum, t) => sum + (t.amount || 0), 0)

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Transaction Management</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatCard
            title="Pending Transactions"
            value={pendingTransactions.length.toString()}
            color="border-yellow-500"
          />
          <StatCard
            title="Pending Amount"
            value={`$${pendingAmount.toFixed(2)}`}
            color="border-orange-500"
          />
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Transactions</h2>

          {pendingTransactions.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No pending transactions</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Member ID</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{tx.memberId.slice(0, 8)}</td>
                      <td className="px-4 py-3 capitalize">{tx.transactionType}</td>
                      <td className="px-4 py-3 font-semibold">${tx.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleApprove(tx.id)}
                          disabled={loading === tx.id}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded text-xs font-semibold transition"
                        >
                          {loading === tx.id ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleReject(tx.id)}
                          disabled={loading === tx.id}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded text-xs font-semibold transition"
                        >
                          {loading === tx.id ? 'Rejecting...' : 'Reject'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
