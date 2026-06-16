'use client'

import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Transaction {
  id: string
  amount: number
  transactionType: string
  status: string
  createdAt: Date
}

interface MemberProfile {
  id: string
  memberCode: string
  totalBalance: number
  availableBalance: number
  totalDeposited: number
  totalWithdrawn: number
  totalBets: number
  totalWinnings: number
}

const chartData = [
  { name: 'Mon', bets: 400, winnings: 240 },
  { name: 'Tue', bets: 300, winnings: 380 },
  { name: 'Wed', bets: 200, winnings: 980 },
  { name: 'Thu', bets: 278, winnings: 390 },
  { name: 'Fri', bets: 189, winnings: 480 },
  { name: 'Sat', bets: 239, winnings: 380 },
  { name: 'Sun', bets: 349, winnings: 430 },
]

export default function MemberDashboardClient({
  profile,
  transactions,
}: {
  profile: MemberProfile
  transactions: Transaction[]
}) {
  const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Member {profile.memberCode}</h1>
          <p className="text-gray-600">Account Balance: ${profile.availableBalance.toFixed(2)}</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Available Balance"
            value={`$${profile.availableBalance.toFixed(2)}`}
            color="border-blue-500"
          />
          <StatCard
            title="Total Deposited"
            value={`$${profile.totalDeposited.toFixed(2)}`}
            color="border-green-500"
          />
          <StatCard
            title="Total Bets"
            value={`$${profile.totalBets.toFixed(2)}`}
            color="border-orange-500"
          />
          <StatCard
            title="Total Winnings"
            value={`$${profile.totalWinnings.toFixed(2)}`}
            color="border-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/member/deposit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              Deposit
            </Link>
            <Link
              href="/member/withdrawal"
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              Withdrawal
            </Link>
            <Link
              href="/member/betting"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              Place Bet
            </Link>
            <Link
              href="/member/bets"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              My Bets
            </Link>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bets" fill="#f97316" />
              <Bar dataKey="winnings" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 capitalize">{tx.transactionType}</td>
                    <td className="px-4 py-3 font-semibold">${tx.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tx.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : tx.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
