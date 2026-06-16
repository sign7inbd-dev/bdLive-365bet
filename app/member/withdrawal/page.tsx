import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Navigation } from '@/components/navigation'
import { getMemberProfile } from '@/app/actions/members'
import WithdrawalClient from './client'

export default async function WithdrawalPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/sign-in')
  }

  const profile = await getMemberProfile()

  return (
    <>
      <Navigation />
      <WithdrawalClient balance={profile?.availableBalance || 0} />
    </>
  )
}
