import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getAdminStats } from '@/app/actions/admin'
import { Navigation } from '@/components/navigation'
import AdminDashboardClient from './client'

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/sign-in')
  }

  const stats = await getAdminStats()

  return (
    <>
      <Navigation />
      <AdminDashboardClient stats={stats} />
    </>
  )
}
