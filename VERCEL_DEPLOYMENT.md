# Vercel Deployment Guide - Flows by CyreneAI

This guide walks you through deploying the Flows by CyreneAI workflow builder to Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Potential Issues & Solutions](#potential-issues--solutions)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Post-Deployment Steps](#post-deployment-steps)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] A [Vercel account](https://vercel.com/signup)
- [ ] A [GitHub account](https://github.com) (for pushing code)
- [ ] A PostgreSQL database (we recommend [Neon](https://neon.tech) - free tier available)
- [ ] An [OpenAI API key](https://platform.openai.com/api-keys) (for AI features)

---

## Potential Issues & Solutions

### 1. ⚠️ Generated Files in .gitignore

**Issue:** The following files are auto-generated and listed in `.gitignore`:
- `lib/types/integration.ts`
- `lib/codegen-registry.ts`
- `lib/step-registry.ts`
- `lib/output-display-configs.ts`

**Solution:** ✅ No action needed. The build script (`pnpm build`) runs `discover-plugins` first, which generates these files automatically during Vercel's build process.

### 2. ⚠️ Database Connection

**Issue:** The app requires a PostgreSQL database with specific tables.

**Solution:** 
- Use [Neon](https://neon.tech) (recommended - integrates with Vercel)
- Run database migrations after deployment
- Set `DATABASE_URL` environment variable

### 3. ⚠️ Authentication Secret

**Issue:** `BETTER_AUTH_SECRET` is required for secure authentication.

**Solution:** Generate a secure random string (at least 32 characters):
```bash
openssl rand -base64 32
```

### 4. ⚠️ Environment Variables Not Committed

**Issue:** `.env` and `.env.local` files are in `.gitignore` and won't be deployed.

**Solution:** All environment variables must be configured in Vercel Dashboard.

### 5. ⚠️ Base URL for Authentication

**Issue:** Authentication callbacks need the correct app URL.

**Solution:** ✅ Auto-handled. The app automatically detects `VERCEL_URL` for preview deployments. For production, set `BETTER_AUTH_URL` or `NEXT_PUBLIC_APP_URL`.

### 6. ⚠️ Build Memory/Time

**Issue:** Complex builds might timeout on free tier.

**Solution:** The app builds in ~7 seconds locally. Should be fine on Vercel.

---

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

First, create a new GitHub repository and push your code:

```bash
# Navigate to the project folder
cd /Users/saurabh/personal/workflow/workflow-builder-template

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Flows by CyreneAI"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Create Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string (looks like `postgresql://user:pass@host/db?sslmode=require`)
4. Save this for the `DATABASE_URL` environment variable

### Step 3: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `pnpm build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `pnpm install`
5. Add Environment Variables (see [Environment Variables](#environment-variables) section)
6. Click **"Deploy"**

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd /Users/saurabh/personal/workflow/workflow-builder-template

# Deploy
vercel

# Follow the prompts to link to your Vercel account
# Choose to link to existing project or create new one
```

### Step 4: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Your Neon connection string | ✅ Yes |
| `BETTER_AUTH_SECRET` | Random 32+ char string | ✅ Yes |
| `AI_GATEWAY_API_KEY` | Your OpenAI API key | ✅ Yes (for AI features) |
| `BETTER_AUTH_URL` | `https://your-domain.vercel.app` | ⚠️ Production only |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | ⚠️ Production only |

### Step 5: Run Database Migrations

After the first deployment, you need to create the database tables:

**Option A: Via Vercel Dashboard (Easiest)**

If using Neon integration:
1. Go to Vercel Dashboard → Your Project → Storage
2. Connect Neon database
3. Tables will be created on first use (with schema push)

**Option B: Local Migration Push**

```bash
# Set DATABASE_URL to your Neon connection string
export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Push schema to database
pnpm db:push
```

**Option C: Using Drizzle Studio**

```bash
export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
pnpm db:studio
```

---

## Environment Variables

### Required Variables

```env
# Database (PostgreSQL - Neon recommended)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Authentication Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-super-secret-random-string-at-least-32-chars

# AI Gateway (OpenAI API Key for AI features)
AI_GATEWAY_API_KEY=sk-your-openai-api-key
```

### Optional Variables

```env
# App URL (auto-detected on Vercel, set for custom domains)
BETTER_AUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Trusted Origins for CORS (comma-separated)
TRUSTED_ORIGINS=https://your-app.vercel.app,https://custom-domain.com

# GitHub OAuth (for GitHub login)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth (for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Vercel OAuth (for Vercel integration login)
VERCEL_CLIENT_ID=your-vercel-client-id
VERCEL_CLIENT_SECRET=your-vercel-client-secret
```

---

## Database Setup

### Required Tables

The app uses Drizzle ORM with the following tables:

- `users` - User accounts
- `sessions` - User sessions
- `accounts` - OAuth accounts
- `verifications` - Email verifications
- `workflows` - Workflow definitions
- `workflow_executions` - Execution history
- `workflow_execution_logs` - Detailed execution logs
- `integrations` - User integration credentials
- `api_keys` - API keys for webhooks

### Creating Tables

Run this command locally (with `DATABASE_URL` set):

```bash
pnpm db:push
```

Or use the Drizzle migrations:

```bash
pnpm db:generate  # Generate migration files
pnpm db:migrate   # Run migrations
```

---

## Post-Deployment Steps

### 1. Verify Deployment

Visit your deployed URL and check:
- [ ] Landing page loads at `/`
- [ ] Builder page loads at `/builder`
- [ ] Workflow template loads at `/workflows/new?template=solana-trader`

### 2. Test Authentication

- [ ] Click "Try Demo" or navigate to builder
- [ ] Anonymous session should be created automatically
- [ ] Check database for new user entry

### 3. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to use the custom domain
4. Add custom domain to `TRUSTED_ORIGINS`

### 4. Enable OAuth Providers (Optional)

To enable GitHub/Google login:
1. Create OAuth app in GitHub/Google
2. Set callback URL to `https://your-app.vercel.app/api/auth/callback/github` (or `/google`)
3. Add client ID and secret to environment variables
4. Redeploy

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module 'lib/step-registry'"**
- The `discover-plugins` script should run during build
- Check that `pnpm build` is the build command in Vercel

**Error: "Database connection failed"**
- Verify `DATABASE_URL` is set correctly
- Check that the Neon database is active
- Ensure SSL mode is enabled (`?sslmode=require`)

### Runtime Errors

**Error: "Unauthorized" on workflow creation**
- This is normal for first-time users
- The app creates an anonymous session automatically
- Check that `BETTER_AUTH_SECRET` is set

**Error: "Invalid origin"**
- Add your domain to `TRUSTED_ORIGINS`
- Check that `BETTER_AUTH_URL` matches your domain

### Database Issues

**Tables don't exist**
- Run `pnpm db:push` locally with `DATABASE_URL` set
- Or connect via Drizzle Studio and verify schema

**Connection timeout**
- Check Neon project is not paused
- Verify connection string format
- Ensure IP is not blocked

---

## Project Structure

```
workflow-builder-template/
├── app/
│   ├── (marketing)/     # Landing page routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (app)/           # Workflow builder routes
│   │   ├── layout.tsx
│   │   ├── builder/
│   │   └── workflows/
│   ├── api/             # API routes
│   └── globals.css
├── components/
│   ├── landing/         # Landing page components
│   ├── workflow/        # Workflow builder components
│   └── ui/              # Shared UI components
├── lib/
│   ├── db/              # Database schema & connection
│   ├── auth.ts          # Authentication config
│   └── ...
├── plugins/             # Workflow plugins (Solana, Telegram, etc.)
├── public/              # Static assets
├── drizzle/             # Database migrations
└── package.json
```

---

## Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create Neon database
- [ ] Import project in Vercel
- [ ] Set `DATABASE_URL`
- [ ] Set `BETTER_AUTH_SECRET`
- [ ] Set `AI_GATEWAY_API_KEY`
- [ ] Deploy
- [ ] Run `pnpm db:push` locally
- [ ] Test landing page at `/`
- [ ] Test builder at `/builder`

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables
4. Check database connection

For more help, refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Better Auth Docs](https://better-auth.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)
