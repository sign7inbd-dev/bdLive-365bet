import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getMemberProfile, getMemberTransactions } from '@/app/actions/members'
import { Navigation } from '@/components/navigation'
import MemberDashboardClient from './client'

export default async function MemberDashboard() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/sign-in')
  }

  const profile = await getMemberProfile()
  const transactions = await getMemberTransactions()

  if (!profile) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-slate-100 p-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-600">Member profile not found. Please contact support.</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <MemberDashboardClient profile={profile} transactions={transactions} />
    </>
  )
}
