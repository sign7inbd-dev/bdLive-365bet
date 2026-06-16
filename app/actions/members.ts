'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { memberProfiles, transactions } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getMemberProfile() {
  const userId = await getUserId()
  const profile = await db
    .select()
    .from(memberProfiles)
    .where(eq(memberProfiles.userId, userId))
    .limit(1)
  return profile[0] || null
}

export async function getAllMembers() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user.role !== 'admin') throw new Error('Unauthorized')
  
  return db.select().from(memberProfiles).orderBy(desc(memberProfiles.createdAt))
}

export async function createMemberTransaction(
  type: 'deposit' | 'withdrawal' | 'bet' | 'winning',
  amount: number,
  description: string
) {
  const userId = await getUserId()
  const member = await db
    .select()
    .from(memberProfiles)
    .where(eq(memberProfiles.userId, userId))
    .limit(1)

  if (!member[0]) throw new Error('Member profile not found')

  const memberId = member[0].id
  const txId = randomUUID()

  const balanceBefore = member[0].availableBalance || 0
  let balanceAfter = balanceBefore

  if (type === 'deposit' || type === 'winning') {
    balanceAfter += amount
  } else {
    balanceAfter -= amount
  }

  await db.insert(transactions).values({
    id: txId,
    userId,
    memberId,
    type,
    transactionType: type,
    amount,
    balanceBefore,
    balanceAfter,
    status: type === 'deposit' ? 'pending' : 'completed',
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  // Update member balance
  await db
    .update(memberProfiles)
    .set({
      availableBalance: balanceAfter,
      totalBalance: balanceAfter,
      updatedAt: new Date(),
    })
    .where(eq(memberProfiles.id, memberId))

  revalidatePath('/member/dashboard')
  return txId
}

export async function getMemberTransactions() {
  const userId = await getUserId()
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt))
}
