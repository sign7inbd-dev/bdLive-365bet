'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { memberProfiles, transactions, adminLogs } from '@/lib/db/schema'
import { desc, eq, and, gte, lte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

async function getAdminId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.role !== 'admin') throw new Error('Unauthorized')
  return session.user.id
}

export async function getAdminStats() {
  const adminId = await getAdminId()
  
  const totalMembers = await db.query.memberProfiles.findMany()
  const allTransactions = await db.query.transactions.findMany()

  const totalDeposits = allTransactions
    .filter(t => t.transactionType === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalWithdrawals = allTransactions
    .filter(t => t.transactionType === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalBets = allTransactions
    .filter(t => t.transactionType === 'bet')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  return {
    totalMembers: totalMembers.length,
    totalDeposits,
    totalWithdrawals,
    totalBets,
    activeMembers: totalMembers.filter(m => m.accountStatus === 'active').length,
  }
}

export async function getPendingTransactions() {
  await getAdminId()
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.status, 'pending'))
    .orderBy(desc(transactions.createdAt))
}

export async function approveTransaction(transactionId: string) {
  const adminId = await getAdminId()
  
  const transaction = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, transactionId))
    .limit(1)

  if (!transaction[0]) throw new Error('Transaction not found')

  await db
    .update(transactions)
    .set({
      status: 'completed',
      approvedBy: adminId,
      approvedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, transactionId))

  // Update member balance if needed
  const tx = transaction[0]
  if (tx.transactionType === 'deposit') {
    const member = await db
      .select()
      .from(memberProfiles)
      .where(eq(memberProfiles.id, tx.memberId))
      .limit(1)

    if (member[0]) {
      const newBalance = (member[0].availableBalance || 0) + (tx.amount || 0)
      await db
        .update(memberProfiles)
        .set({
          availableBalance: newBalance,
          totalBalance: newBalance,
          updatedAt: new Date(),
        })
        .where(eq(memberProfiles.id, tx.memberId))
    }
  }

  // Log action
  await db.insert(adminLogs).values({
    id: randomUUID(),
    adminId,
    action: 'approve_transaction',
    entityType: 'transaction',
    entityId: transactionId,
    createdAt: new Date(),
  })

  revalidatePath('/admin/transactions')
  return true
}

export async function rejectTransaction(transactionId: string, reason: string) {
  const adminId = await getAdminId()
  
  await db
    .update(transactions)
    .set({
      status: 'rejected',
      approvedBy: adminId,
      approvedAt: new Date(),
      description: reason,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, transactionId))

  revalidatePath('/admin/transactions')
  return true
}
