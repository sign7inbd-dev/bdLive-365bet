'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

interface DashboardStats {
  totalMembers: number
  totalDeposits: number
  totalWithdrawals: number
  totalBets: number
  activeMembers: number
}

const chartData = [
  { name: 'Jan', deposits: 4000, withdrawals: 2400, bets: 2400 },
  { name: 'Feb', deposits: 3000, withdrawals: 1398, bets: 2210 },
  { name: 'Mar', deposits: 2000, withdrawals: 9800, bets: 2290 },
  { name: 'Apr', deposits: 2780, withdrawals: 3908, bets: 2000 },
  { name: 'May', deposits: 1890, withdrawals: 4800, bets: 2181 },
  { name: 'Jun', deposits: 2390, withdrawals: 3800, bets: 2500 },
]

export default function AdminDashboardClient({ stats }: { stats: DashboardStats }) {
  const StatCard = ({ title, value, color }: { title: string; value: number | string; color: string }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">
        {typeof value === 'number' && value > 100 ? value.toLocaleString() : value}
      </p>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            color="border-blue-500"
          />
          <StatCard
            title="Active Members"
            value={stats.activeMembers}
            color="border-green-500"
          />
          <StatCard
            title="Total Deposits"
            value={`$${stats.totalDeposits.toFixed(2)}`}
            color="border-yellow-500"
          />
          <StatCard
            title="Total Withdrawals"
            value={`$${stats.totalWithdrawals.toFixed(2)}`}
            color="border-red-500"
          />
          <StatCard
            title="Total Bets"
            value={`$${stats.totalBets.toFixed(2)}`}
            color="border-purple-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Transactions</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deposits" fill="#3b82f6" />
                <Bar dataKey="withdrawals" fill="#ef4444" />
                <Bar dataKey="bets" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deposits" stroke="#3b82f6" />
                <Line type="monotone" dataKey="bets" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
              View Transactions
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
              Manage Members
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition">
              View Reports
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition">
              Set Promotions
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
