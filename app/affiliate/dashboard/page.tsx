import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Navigation } from '@/components/navigation'
import AffiliateDashboardClient from './client'

export default async function AffiliateDashboard() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'affiliate') {
    redirect('/sign-in')
  }

  return (
    <>
      <Navigation />
      <AffiliateDashboardClient />
    </>
  )
}
