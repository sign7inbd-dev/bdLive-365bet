import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getPendingTransactions } from '@/app/actions/admin'
import { Navigation } from '@/components/navigation'
import AdminTransactionsClient from './client'

export default async function AdminTransactions() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/sign-in')
  }

  const pendingTransactions = await getPendingTransactions()

  return (
    <>
      <Navigation />
      <AdminTransactionsClient pendingTransactions={pendingTransactions} />
    </>
  )
}
