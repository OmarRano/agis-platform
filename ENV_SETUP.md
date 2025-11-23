# Environment Variables Setup Guide

## 📋 Files

- `.env.example` - Template for all available variables (safe to commit)
- `.env.production` - Production values (DO NOT commit to Git)
- `.env.local` - Local development values (ignored by Git)

---

## 🔑 Required Environment Variables

### 1. API Configuration
```
REACT_APP_API_URL=https://your-api-domain.com
```
- Your backend API endpoint (update to your actual domain)
- Used for all API calls (login, signup, marketplace, etc.)

### 2. Payment Processing (Stripe)
```
REACT_APP_STRIPE_PUBLIC_KEY=<STRIPE_PUBLISHABLE_KEY>
```
- **Publishable Key** from Stripe (NOT secret key)
- Get from: https://dashboard.stripe.com/apikeys
- Used for payment modal integration
- Update with your actual publishable key from Stripe

### 3. Feature Flags
```
REACT_APP_ENABLE_PAYMENTS=true
REACT_APP_ENABLE_NOTIFICATIONS=true
```
- Enable/disable features in production
- Useful for gradual rollouts

### 4. Build Environment
```
NODE_ENV=production
CI=false
```
- `NODE_ENV=production` tells React to use optimized builds
- `CI=false` prevents warnings from blocking deployment

---

## 🚀 Setting Up in Netlify

### Step 1: Go to Netlify Dashboard
1. Open your site in Netlify
2. Go to **Site settings** → **Build & deploy** → **Environment**

### Step 2: Add Environment Variables
Click **"Edit variables"** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://your-api-domain.com` |
| `REACT_APP_STRIPE_PUBLIC_KEY` | `<STRIPE_PUBLISHABLE_KEY>` |
| `REACT_APP_ENABLE_PAYMENTS` | `true` |
| `REACT_APP_ENABLE_NOTIFICATIONS` | `true` |
| `NODE_ENV` | `production` |
| `CI` | `false` |

### Step 3: Redeploy
1. Go to **Deploys**
2. Click your latest deploy
3. Click **"Redeploy"** button
4. Netlify rebuilds with new variables

---

## 💻 Local Development Setup

### 1. Create `.env.local`
```bash
cp .env.example .env.local
```

### 2. Edit `.env.local` with your local values
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_test_key_here
REACT_APP_ENABLE_PAYMENTS=true
```

### 3. Start dev server
```bash
npm start
```
React automatically loads variables from `.env.local`

---

## 🔒 Security Best Practices

✅ **DO:**
- Use Netlify dashboard for sensitive values
- Use `.env.example` for template only
- Keep `.env.production` local (not in Git)
- Use different keys for development vs production
- Rotate Stripe keys regularly

❌ **DON'T:**
- Commit `.env.production` to Git
- Put secret keys in code or comments
- Use same keys for dev and production
- Share keys in Slack/email
- Push `.env` files to GitHub

---

## 📦 What Gets Bundled

When you use `REACT_APP_*` variables:
- ✅ Values are baked into the build at compile time
- ❌ They are **NOT** secret (visible in browser)
- ✅ Safe for API URLs, public Stripe keys
- ❌ Never use for API secrets, database passwords

---

## 🧪 Verify Variables Are Set

After deploying, open your site and check:
```javascript
// Open browser console
console.log(process.env.REACT_APP_API_URL)
// Should show: https://api.digiagis.com
```

---

## 🔄 Changing Variables

1. Update in Netlify dashboard
2. Click **"Redeploy"** (previous deploy)
3. Variables take effect immediately
4. No need to rebuild locally

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Variables undefined | Redeploy after adding them to Netlify |
| Old values cached | Clear browser cache or use incognito mode |
| Stripe errors | Check you're using **Publishable Key**, not Secret Key |
| API not working | Verify `REACT_APP_API_URL` is correct in Netlify settings |

---

## Next Steps

1. ✅ Create `.env.local` for local development
2. ✅ Add variables to Netlify dashboard
3. ✅ Redeploy on Netlify
4. ✅ Test your app with real API endpoint
5. ✅ Verify Stripe integration works

**Note**: `.env.production` file is provided as reference. Real secrets should ONLY be in Netlify dashboard, never committed to Git.
