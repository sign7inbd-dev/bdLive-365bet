import { pgTable, text, timestamp, boolean, numeric, integer, serial, varchar } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
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
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- JCMM App Tables -------------------------------------------------------

// Member/User Roles
export const memberRole = pgTable('memberRole', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  roleType: text('roleType').notNull(), // 'admin', 'member', 'affiliate'
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Member Groups
export const memberGroup = pgTable('memberGroup', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin who created it
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Member Management
export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // FK to user table
  accountId: varchar('accountId', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  fullName: varchar('fullName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  agentId: text('agentId'), // reference to affiliate/agent
  groupId: integer('groupId'), // reference to memberGroup
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, inactive, suspended
  balance: numeric('balance', { precision: 15, scale: 2 }).notNull().default('0'),
  turnover: numeric('turnover', { precision: 15, scale: 2 }).notNull().default('0'),
  registrationDate: timestamp('registrationDate').notNull().defaultNow(),
  lastLogin: timestamp('lastLogin'),
  ipAddress: varchar('ipAddress', { length: 50 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Bank Management
export const banks = pgTable('banks', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  bankName: varchar('bankName', { length: 255 }).notNull(),
  bankCode: varchar('bankCode', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Bank Accounts
export const bankAccounts = pgTable('bankAccounts', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  bankId: integer('bankId').notNull(), // reference to banks
  accountName: varchar('accountName', { length: 255 }).notNull(),
  accountNumber: varchar('accountNumber', { length: 100 }).notNull().unique(),
  accountHolder: varchar('accountHolder', { length: 255 }).notNull(),
  balance: numeric('balance', { precision: 15, scale: 2 }).notNull().default('0'),
  threshold: numeric('threshold', { precision: 15, scale: 2 }).notNull().default('0'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  pgOption: boolean('pgOption').notNull().default(false), // payment gateway
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Transactions
export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin handling
  memberId: integer('memberId').notNull(), // reference to members
  transactionId: varchar('transactionId', { length: 100 }).notNull().unique(),
  type: varchar('type', { length: 50 }).notNull(), // 'deposit', 'withdrawal', 'promotion', 'adjustment_in', 'adjustment_out', 'rebate'
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  channel: varchar('channel', { length: 50 }), // 'online_banking', 'atm_transfer', 'cash_deposit'
  status: varchar('status', { length: 50 }).notNull().default('new_request'), // new_request, acknowledged, completed, rejected
  bankAccountId: integer('bankAccountId'), // reference to bankAccounts
  remark: text('remark'),
  turnoverRequirement: numeric('turnoverRequirement', { precision: 15, scale: 2 }).default('0'),
  currentRollover: numeric('currentRollover', { precision: 15, scale: 2 }).default('0'),
  accumulateTurnover: boolean('accumulateTurnover').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Products
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Promotions
export const promotions = pgTable('promotions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // 'deposit_bonus', 'welcome_bonus', 'refund', etc.
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 2 }), // for percentage-based promotions
  minDeposit: numeric('minDeposit', { precision: 15, scale: 2 }),
  maxBonus: numeric('maxBonus', { precision: 15, scale: 2 }),
  turnoverMultiplier: numeric('turnoverMultiplier', { precision: 5, scale: 2 }).default('1'),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Promotion Claims
export const promotionClaims = pgTable('promotionClaims', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  memberId: integer('memberId').notNull(), // reference to members
  promotionId: integer('promotionId').notNull(), // reference to promotions
  bonusAmount: numeric('bonusAmount', { precision: 15, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  claimedAt: timestamp('claimedAt').notNull().defaultNow(),
  approvedAt: timestamp('approvedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Rebates
export const rebates = pgTable('rebates', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  name: varchar('name', { length: 255 }).notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 2 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Member Rebate History
export const memberRebateHistory = pgTable('memberRebateHistory', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  memberId: integer('memberId').notNull(), // reference to members
  rebateId: integer('rebateId').notNull(), // reference to rebates
  amount: numeric('amount', { precision: 15, scale: 2 }).notNull(),
  period: varchar('period', { length: 50 }).notNull(), // 'daily', 'weekly', 'monthly'
  status: varchar('status', { length: 50 }).notNull().default('calculated'), // calculated, approved, paid
  calculatedAt: timestamp('calculatedAt').notNull().defaultNow(),
  approvedAt: timestamp('approvedAt'),
  paidAt: timestamp('paidAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Affiliates/Agents
export const affiliates = pgTable('affiliates', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // FK to user table
  affiliateCode: varchar('affiliateCode', { length: 100 }).notNull().unique(),
  accountId: varchar('accountId', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  commissionPercentage: numeric('commissionPercentage', { precision: 5, scale: 2 }).notNull().default('0'),
  totalReferrals: integer('totalReferrals').notNull().default('0'),
  totalCommission: numeric('totalCommission', { precision: 15, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Affiliate Links
export const affiliateLinks = pgTable('affiliateLinks', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  affiliateId: integer('affiliateId').notNull(), // reference to affiliates
  linkType: varchar('linkType', { length: 50 }).notNull(), // 'individual_link', 'subdomain_link'
  linkUrl: text('linkUrl').notNull(),
  clicks: integer('clicks').notNull().default('0'),
  conversions: integer('conversions').notNull().default('0'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Admin Roles
export const adminRoles = pgTable('adminRoles', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  roleName: varchar('roleName', { length: 255 }).notNull(),
  permissions: text('permissions'), // JSON string of permissions
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Reports/Statistics - Game
export const gameStatistics = pgTable('gameStatistics', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  date: timestamp('date').notNull().defaultNow(),
  totalWagers: numeric('totalWagers', { precision: 15, scale: 2 }).notNull().default('0'),
  totalWins: numeric('totalWins', { precision: 15, scale: 2 }).notNull().default('0'),
  totalLoses: numeric('totalLoses', { precision: 15, scale: 2 }).notNull().default('0'),
  netWinLose: numeric('netWinLose', { precision: 15, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Website Statistics
export const websiteStatistics = pgTable('websiteStatistics', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  date: timestamp('date').notNull().defaultNow(),
  totalMembers: integer('totalMembers').notNull().default('0'),
  activeMembers: integer('activeMembers').notNull().default('0'),
  totalDeposits: numeric('totalDeposits', { precision: 15, scale: 2 }).notNull().default('0'),
  totalWithdrawals: numeric('totalWithdrawals', { precision: 15, scale: 2 }).notNull().default('0'),
  totalBonuses: numeric('totalBonuses', { precision: 15, scale: 2 }).notNull().default('0'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// CMS - Banners
export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('imageUrl'),
  linkUrl: text('linkUrl'),
  position: varchar('position', { length: 50 }), // 'homepage', 'sidebar', etc.
  status: varchar('status', { length: 50 }).notNull().default('active'),
  startDate: timestamp('startDate'),
  endDate: timestamp('endDate'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// CMS - Announcements
export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'popup', 'banner', 'notification'
  status: varchar('status', { length: 50 }).notNull().default('active'),
  publishedAt: timestamp('publishedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// CMS - Pages/Content
export const cmsPages = pgTable('cmsPages', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  metaDescription: text('metaDescription'),
  metaKeywords: text('metaKeywords'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// SEO Settings
export const seoSettings = pgTable('seoSettings', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin
  pageSlug: varchar('pageSlug', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  keywords: text('keywords'),
  ogImage: text('ogImage'),
  ogTitle: text('ogTitle'),
  ogDescription: text('ogDescription'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Audit Log
export const auditLog = pgTable('auditLog', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(), // admin who performed the action
  action: varchar('action', { length: 255 }).notNull(),
  table: varchar('table', { length: 255 }).notNull(),
  recordId: varchar('recordId', { length: 255 }),
  oldValue: text('oldValue'),
  newValue: text('newValue'),
  ipAddress: varchar('ipAddress', { length: 50 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
