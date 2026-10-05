# Majid Arain - Portfolio & Digital Architecture

Modern, high-performance web portfolio built with React 19, TypeScript, Tailwind CSS, Vite, and Motion.

---

## 🚀 Quick Netlify Deployment Guide

This project is pre-configured and 100% production-ready for Netlify deployment directly from GitHub.

### Step 1: Push Code to GitHub
If you haven't initialized Git yet:
```bash
git init
git add .
git commit -m "feat: portfolio ready for Netlify deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Import Project on Netlify
1. Go to [Netlify](https://app.netlify.com/) and log in.
2. Click **"Add new site"** &rarr; **"Import an existing project"**.
3. Select **GitHub** and choose your repository.
4. Netlify will automatically detect `netlify.toml` with the following optimal settings:
   - **Build command**: `npm run build:client` (or `npm run build`)
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
   - **Node Version**: `20`
5. Click **"Deploy site"**.

Your website will be live in under 60 seconds with SSL HTTPS enabled!

---

## 🛠️ Netlify Configuration Features Included

1. **`netlify.toml`**:
   - Zero-config auto-detection for Vite React SPA.
   - Enforces modern Node 20 runtime.
   - Automatic Single Page Application (SPA) routing fallback (`/*` &rarr; `/index.html` 200).
   - Security headers (CSP, X-Frame-Options, X-Content-Type-Options).
   - Immutable browser caching for fast asset loading (`/assets/*`).

2. **`public/_redirects`**:
   - Backup SPA redirect rule automatically copied into `dist/` during build.

3. **`netlify/functions/send-contact.ts`**:
   - Serverless backend function handling form submissions at `/api/send-contact`.

4. **`.gitignore`**:
   - Excludes `node_modules`, `dist`, `.netlify`, `.env`, and build logs from Git.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local full-stack server
npm run dev
```
Local dev server runs on `http://localhost:3000`.
