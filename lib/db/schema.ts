import { pgTable, text, timestamp, boolean, decimal, integer, varchar } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  role: text('role').default('member'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refreshToken: text('refreshToken'),
  accessToken: text('accessToken'),
  expiresAt: timestamp('expiresAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- JCMM Platform Tables ---------------------------------------------------

export const memberProfiles = pgTable('member_profiles', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  memberCode: varchar('memberCode', { length: 50 }).notNull().unique(),
  referralCode: varchar('referralCode', { length: 50 }).unique(),
  parentMemberId: text('parentMemberId').references(() => memberProfiles.id, { onDelete: 'setNull' }),
  memberLevel: varchar('memberLevel', { length: 20 }).default('regular'),
  accountStatus: varchar('accountStatus', { length: 20 }).default('active'),
  phoneNumber: varchar('phoneNumber', { length: 20 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  totalBalance: decimal('totalBalance', { precision: 15, scale: 2 }).default('0'),
  availableBalance: decimal('availableBalance', { precision: 15, scale: 2 }).default('0'),
  totalDeposited: decimal('totalDeposited', { precision: 15, scale: 2 }).default('0'),
  totalWithdrawn: decimal('totalWithdrawn', { precision: 15, scale: 2 }).default('0'),
  totalBets: decimal('totalBets', { precision: 15, scale: 2 }).default('0'),
  totalWinnings: decimal('totalWinnings', { precision: 15, scale: 2 }).default('0'),
  lastLoginAt: timestamp('lastLoginAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  memberId: text('memberId')
    .notNull()
    .references(() => memberProfiles.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 20 }).notNull(),
  transactionType: varchar('transactionType', { length: 50 }).notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  balanceBefore: decimal('balanceBefore', { precision: 15, scale: 2 }),
  balanceAfter: decimal('balanceAfter', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 20 }).default('pending'),
  paymentMethod: varchar('paymentMethod', { length: 50 }),
  bankId: text('bankId'),
  referenceNo: varchar('referenceNo', { length: 100 }),
  description: text('description'),
  approvedBy: text('approvedBy'),
  approvedAt: timestamp('approvedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const bankAccounts = pgTable('bank_accounts', {
  id: text('id').primaryKey(),
  bankName: varchar('bankName', { length: 100 }).notNull(),
  accountHolder: varchar('accountHolder', { length: 100 }).notNull(),
  accountNumber: varchar('accountNumber', { length: 50 }).notNull().unique(),
  bankCode: varchar('bankCode', { length: 20 }),
  branchCode: varchar('branchCode', { length: 20 }),
  accountType: varchar('accountType', { length: 50 }),
  balance: decimal('balance', { precision: 15, scale: 2 }).default('0'),
  dailyLimit: decimal('dailyLimit', { precision: 15, scale: 2 }),
  monthlyLimit: decimal('monthlyLimit', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 20 }).default('active'),
  isDefault: boolean('isDefault').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const memberBankAccounts = pgTable('member_bank_accounts', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  memberId: text('memberId')
    .notNull()
    .references(() => memberProfiles.id, { onDelete: 'cascade' }),
  bankName: varchar('bankName', { length: 100 }).notNull(),
  accountHolder: varchar('accountHolder', { length: 100 }).notNull(),
  accountNumber: varchar('accountNumber', { length: 50 }).notNull(),
  bankCode: varchar('bankCode', { length: 20 }),
  ifscCode: varchar('ifscCode', { length: 20 }),
  accountType: varchar('accountType', { length: 50 }),
  status: varchar('status', { length: 20 }).default('active'),
  isVerified: boolean('isVerified').default(false),
  isDefault: boolean('isDefault').default(false),
  verifiedAt: timestamp('verifiedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const promotions = pgTable('promotions', {
  id: text('id').primaryKey(),
  promotionCode: varchar('promotionCode', { length: 50 }).notNull().unique(),
  promotionName: varchar('promotionName', { length: 100 }).notNull(),
  promotionType: varchar('promotionType', { length: 50 }),
  description: text('description'),
  percentage: decimal('percentage', { precision: 5, scale: 2 }),
  fixedAmount: decimal('fixedAmount', { precision: 15, scale: 2 }),
  minAmount: decimal('minAmount', { precision: 15, scale: 2 }),
  maxAmount: decimal('maxAmount', { precision: 15, scale: 2 }),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  usageLimit: integer('usageLimit'),
  usageCount: integer('usageCount').default(0),
  status: varchar('status', { length: 20 }).default('active'),
  applicableFor: varchar('applicableFor', { length: 100 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const rebates = pgTable('rebates', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  memberId: text('memberId')
    .notNull()
    .references(() => memberProfiles.id, { onDelete: 'cascade' }),
  rebateType: varchar('rebateType', { length: 50 }),
  rebatePercentage: decimal('rebatePercentage', { precision: 5, scale: 2 }),
  rebateAmount: decimal('rebateAmount', { precision: 15, scale: 2 }),
  totalBets: decimal('totalBets', { precision: 15, scale: 2 }),
  winLoss: decimal('winLoss', { precision: 15, scale: 2 }),
  rebatePeriod: varchar('rebatePeriod', { length: 20 }),
  status: varchar('status', { length: 20 }).default('pending'),
  claimedAt: timestamp('claimedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const affiliateAccounts = pgTable('affiliate_accounts', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  affiliateCode: varchar('affiliateCode', { length: 50 }).notNull().unique(),
  affiliateName: varchar('affiliateName', { length: 100 }).notNull(),
  affiliateLevel: varchar('affiliateLevel', { length: 20 }).default('standard'),
  commissionPercentage: decimal('commissionPercentage', { precision: 5, scale: 2 }),
  totalReferrals: integer('totalReferrals').default(0),
  totalCommission: decimal('totalCommission', { precision: 15, scale: 2 }).default('0'),
  withdrawnCommission: decimal('withdrawnCommission', { precision: 15, scale: 2 }).default('0'),
  pendingCommission: decimal('pendingCommission', { precision: 15, scale: 2 }).default('0'),
  monthlyTarget: decimal('monthlyTarget', { precision: 15, scale: 2 }),
  monthlyAchieved: decimal('monthlyAchieved', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 20 }).default('active'),
  joinedAt: timestamp('joinedAt').notNull().defaultNow(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const affiliateCommissions = pgTable('affiliate_commissions', {
  id: text('id').primaryKey(),
  affiliateId: text('affiliateId')
    .notNull()
    .references(() => affiliateAccounts.id, { onDelete: 'cascade' }),
  memberId: text('memberId')
    .notNull()
    .references(() => memberProfiles.id, { onDelete: 'cascade' }),
  commissionAmount: decimal('commissionAmount', { precision: 15, scale: 2 }).notNull(),
  commissionType: varchar('commissionType', { length: 50 }),
  betAmount: decimal('betAmount', { precision: 15, scale: 2 }),
  winAmount: decimal('winAmount', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 20 }).default('pending'),
  approvedAt: timestamp('approvedAt'),
  paidAt: timestamp('paidAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const sportsEvents = pgTable('sports_events', {
  id: text('id').primaryKey(),
  eventName: varchar('eventName', { length: 255 }).notNull(),
  eventType: varchar('eventType', { length: 50 }),
  sportType: varchar('sportType', { length: 50 }),
  homeTeam: varchar('homeTeam', { length: 100 }),
  awayTeam: varchar('awayTeam', { length: 100 }),
  eventDate: timestamp('eventDate').notNull(),
  eventStatus: varchar('eventStatus', { length: 20 }).default('upcoming'),
  result: varchar('result', { length: 50 }),
  odds: decimal('odds', { precision: 5, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const bettingSlips = pgTable('betting_slips', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  memberId: text('memberId')
    .notNull()
    .references(() => memberProfiles.id, { onDelete: 'cascade' }),
  slipNumber: varchar('slipNumber', { length: 50 }).notNull().unique(),
  betAmount: decimal('betAmount', { precision: 15, scale: 2 }).notNull(),
  totalOdds: decimal('totalOdds', { precision: 10, scale: 2 }),
  potentialWinning: decimal('potentialWinning', { precision: 15, scale: 2 }),
  actualWinning: decimal('actualWinning', { precision: 15, scale: 2 }),
  betType: varchar('betType', { length: 50 }),
  betStatus: varchar('betStatus', { length: 20 }).default('pending'),
  settledAt: timestamp('settledAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const betSelections = pgTable('bet_selections', {
  id: text('id').primaryKey(),
  bettingSlipId: text('bettingSlipId')
    .notNull()
    .references(() => bettingSlips.id, { onDelete: 'cascade' }),
  eventId: text('eventId')
    .notNull()
    .references(() => sportsEvents.id, { onDelete: 'cascade' }),
  selectedOption: varchar('selectedOption', { length: 100 }),
  odds: decimal('odds', { precision: 5, scale: 2 }).notNull(),
  result: varchar('result', { length: 50 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const adminLogs = pgTable('admin_logs', {
  id: text('id').primaryKey(),
  adminId: text('adminId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 100 }).notNull(),
  entityType: varchar('entityType', { length: 50 }),
  entityId: text('entityId'),
  changes: text('changes'),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const reports = pgTable('reports', {
  id: text('id').primaryKey(),
  reportType: varchar('reportType', { length: 50 }).notNull(),
  reportDate: timestamp('reportDate').notNull(),
  totalMembers: integer('totalMembers'),
  totalDeposits: decimal('totalDeposits', { precision: 15, scale: 2 }),
  totalWithdrawals: decimal('totalWithdrawals', { precision: 15, scale: 2 }),
  totalBets: decimal('totalBets', { precision: 15, scale: 2 }),
  totalWinnings: decimal('totalWinnings', { precision: 15, scale: 2 }),
  totalRebates: decimal('totalRebates', { precision: 15, scale: 2 }),
  totalAffiliateCommissions: decimal('totalAffiliateCommissions', { precision: 15, scale: 2 }),
  platformProfit: decimal('platformProfit', { precision: 15, scale: 2 }),
  data: text('data'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
