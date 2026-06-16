import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Navigation } from '@/components/navigation'

export default async function MyBetsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bets</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Betting history and details coming soon...</p>
          </div>
        </div>
      </main>
    </>
  )
}
