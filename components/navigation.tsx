'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/sign-in') } })
    } finally {
      setIsLoading(false)
    }
  }

  const isAdminPath = pathname?.startsWith('/admin')
  const isMemberPath = pathname?.startsWith('/member')
  const isAffiliatePath = pathname?.startsWith('/affiliate')

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/members', label: 'Members' },
    { href: '/admin/transactions', label: 'Transactions' },
    { href: '/admin/banks', label: 'Banks' },
    { href: '/admin/promotions', label: 'Promotions' },
    { href: '/admin/reports', label: 'Reports' },
    { href: '/admin/affiliates', label: 'Affiliates' },
  ]

  const memberLinks = [
    { href: '/member/dashboard', label: 'Dashboard' },
    { href: '/member/deposit', label: 'Deposit' },
    { href: '/member/withdrawal', label: 'Withdrawal' },
    { href: '/member/betting', label: 'Betting' },
    { href: '/member/bets', label: 'My Bets' },
    { href: '/member/profile', label: 'Profile' },
  ]

  const affiliateLinks = [
    { href: '/affiliate/dashboard', label: 'Dashboard' },
    { href: '/affiliate/referrals', label: 'Referrals' },
    { href: '/affiliate/commissions', label: 'Commissions' },
    { href: '/affiliate/stats', label: 'Statistics' },
  ]

  const links = isAdminPath ? adminLinks : isMemberPath ? memberLinks : isAffiliatePath ? affiliateLinks : []

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          bdLive 365bet
        </Link>
        
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === link.href
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 rounded-md text-sm font-medium transition"
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </nav>
  )
}
