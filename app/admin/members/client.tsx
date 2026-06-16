'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Member {
  id: string
  userId: string
  memberCode: string
  accountStatus: string
  totalBalance: number
  totalDeposited: number
  totalWithdrawn: number
  totalBets: number
  totalWinnings: number
  createdAt: Date
}

export default function AdminMembersClient({ members }: { members: Member[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.memberCode.toLowerCase().includes(search.toLowerCase()) ||
      m.userId.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || m.accountStatus === filter
    return matchesSearch && matchesFilter
  })

  const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  )

  const totalBalance = members.reduce((sum, m) => sum + (m.totalBalance || 0), 0)
  const totalDeposited = members.reduce((sum, m) => sum + (m.totalDeposited || 0), 0)

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Member Management</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Total Members"
            value={members.length.toString()}
            color="border-blue-500"
          />
          <StatCard
            title="Total Balance"
            value={`$${totalBalance.toFixed(2)}`}
            color="border-green-500"
          />
          <StatCard
            title="Total Deposited"
            value={`$${totalDeposited.toFixed(2)}`}
            color="border-yellow-500"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search Member</label>
              <input
                type="text"
                placeholder="Search by member code or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Filter Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Members</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Members List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Member Code</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Total Balance</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Deposited</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Total Bets</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">{member.memberCode}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.accountStatus === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {member.accountStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">${member.totalBalance.toFixed(2)}</td>
                    <td className="px-4 py-3">${member.totalDeposited.toFixed(2)}</td>
                    <td className="px-4 py-3">${member.totalBets.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <p className="text-center text-gray-600 py-8">No members found</p>
          )}
        </div>
      </div>
    </main>
  )
}
