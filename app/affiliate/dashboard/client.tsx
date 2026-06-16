'use client'

import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

const chartData = [
  { name: 'Week 1', referrals: 12, commission: 450 },
  { name: 'Week 2', referrals: 19, commission: 650 },
  { name: 'Week 3', referrals: 15, commission: 550 },
  { name: 'Week 4', referrals: 25, commission: 900 },
]

export default function AffiliateDashboardClient() {
  const affiliateCode = 'AFFY12345'
  const totalReferrals = 71
  const totalCommission = 2550.00
  const pendingCommission = 450.00
  const withdrawnCommission = 2100.00

  const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Affiliate Dashboard</h1>

        {/* Affiliate Code Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow p-6 mb-8 text-white">
          <p className="text-sm font-medium opacity-90">Your Affiliate Code</p>
          <div className="flex items-center gap-4 mt-2">
            <code className="text-2xl font-mono font-bold bg-black bg-opacity-20 px-4 py-2 rounded">
              {affiliateCode}
            </code>
            <button className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-purple-50 transition">
              Copy
            </button>
          </div>
          <p className="text-sm mt-3 opacity-90">Share this code with your referrals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Referrals"
            value={totalReferrals.toString()}
            color="border-blue-500"
          />
          <StatCard
            title="Total Commission"
            value={`$${totalCommission.toFixed(2)}`}
            color="border-green-500"
          />
          <StatCard
            title="Pending Commission"
            value={`$${pendingCommission.toFixed(2)}`}
            color="border-yellow-500"
          />
          <StatCard
            title="Withdrawn"
            value={`$${withdrawnCommission.toFixed(2)}`}
            color="border-purple-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Referrals Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="referrals" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Commission Earned</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commission" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/affiliate/referrals"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              View Referrals
            </Link>
            <Link
              href="/affiliate/commissions"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center transition"
            >
              Commission Details
            </Link>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition">
              Withdraw Commission
            </button>
          </div>
        </div>

        {/* Recent Referrals Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Referrals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Member ID</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Joined Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Total Bets</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Commission</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">MEM{String(i).padStart(5, '0')}</td>
                    <td className="px-4 py-3">{new Date().toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-semibold">$5,000</td>
                    <td className="px-4 py-3 font-semibold text-green-600">$250</td>
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
