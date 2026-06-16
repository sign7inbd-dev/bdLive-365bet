import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Navigation } from '@/components/navigation'
import BettingClient from './client'

export default async function BettingPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navigation />
      <BettingClient />
    </>
  )
}
