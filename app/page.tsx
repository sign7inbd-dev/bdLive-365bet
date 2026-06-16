import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  // Redirect based on user role
  const userRole = session.user.role || 'member'
  
  if (userRole === 'admin') {
    redirect('/admin/dashboard')
  } else if (userRole === 'affiliate') {
    redirect('/affiliate/dashboard')
  } else {
    redirect('/member/dashboard')
  }
}
