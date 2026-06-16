import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getAllMembers } from '@/app/actions/members'
import { Navigation } from '@/components/navigation'
import AdminMembersClient from './client'

export default async function AdminMembers() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/sign-in')
  }

  const members = await getAllMembers()

  return (
    <>
      <Navigation />
      <AdminMembersClient members={members} />
    </>
  )
}
