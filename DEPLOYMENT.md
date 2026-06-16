# JCMM Platform - Deployment Guide

## Quick Start Deployment

### Step 1: Prepare the Code
```bash
# The code is already in the main branch
git checkout main
```

### Step 2: Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
DATABASE_URL=postgresql://...your-neon-url...
BETTER_AUTH_SECRET=your-generated-secret
```

To generate BETTER_AUTH_SECRET:
```bash
openssl rand -base64 32
```

### Step 3: Deploy to Vercel

#### Method A: GitHub Integration (Recommended)
1. Push code to GitHub: `git push origin main`
2. Go to Vercel Dashboard
3. Select your project (prj_rPc9Eosbe7ZCONLpUrAuWZbsPJdf)
4. Click "Deploy"
5. Vercel will auto-build and deploy

#### Method B: Using Vercel CLI
```bash
vercel deploy --prod
```

### Step 4: Verify Deployment

```bash
# Check the deployed URL
curl https://your-deployment.vercel.app/sign-in -I
```

## Post-Deployment Setup

### 1. Create Admin User
```sql
-- In Neon PostgreSQL:
UPDATE "user" 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

### 2. Configure Bank Accounts
- Log in as admin
- Go to `/admin/banks`
- Add system bank accounts
- Set daily/monthly limits

### 3. Setup Initial Promotions
- Go to `/admin/promotions`
- Create welcome bonus promotion
- Set percentage and conditions

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Database connected and tables created
- [ ] Admin user created and verified
- [ ] Bank accounts configured
- [ ] Welcome promotion active
- [ ] SSL/TLS enabled (automatic with Vercel)
- [ ] Custom domain configured (optional)
- [ ] Email notifications setup (if needed)
- [ ] Backup strategy confirmed with Neon
- [ ] Monitoring and alerts configured

## Monitoring

### Real-time Monitoring
- Vercel Deployments: https://vercel.com/dashboard
- Database: Neon Console
- Logs: Vercel Log Viewer

### Health Checks
- Sign-in page: `/sign-in`
- Admin dashboard: `/admin/dashboard`
- Member panel: `/member/dashboard`

## Rollback Plan

If deployment fails:

```bash
# Rollback to previous version
vercel rollback

# Or manually redeploy from GitHub
git revert HEAD
git push origin main
```

## Performance Optimization

The platform is optimized for:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

Monitor these metrics in Vercel Analytics.

## Scaling Considerations

### Database
- Neon auto-scales read replicas
- Connection pooling enabled
- Prepared statements for performance

### Application
- Server-side rendering for fast FCP
- Static assets cached at edge
- Database queries optimized with Drizzle

### Traffic
- Vercel scales automatically
- No manual server management needed

## Security in Production

1. **HTTPS Only** - Automatic with Vercel
2. **Environment Variables** - Stored securely
3. **Database Credentials** - In Neon secure vault
4. **Session Cookies** - Secure, HttpOnly, SameSite=Strict
5. **User Data** - Encrypted at rest in Neon

## Support

For issues:
1. Check Vercel logs
2. Check Neon database status
3. Review environment variables
4. Check network connectivity

---

**Deployment Status**: Ready for Production
