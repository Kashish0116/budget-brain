# Migration Guide: TanStack Start → Next.js

This document outlines the changes made during the migration from TanStack Start to Next.js.

## Overview

The project has been successfully migrated from TanStack Start (with Vite) to Next.js 15, maintaining all functionality and components while leveraging Next.js's built-in features.

## Key Changes

### 1. Build Tool & Framework

- **Before**: Vite + TanStack Start
- **After**: Next.js 15
- **Benefit**: Simpler setup, built-in SSR, API routes, automatic code splitting, better performance

### 2. Routing System

- **Before**: TanStack React Router with file-based routing in `src/routes/`
  - Routes defined as `__root.tsx`, `index.tsx`, etc.
  - Custom route tree generation
- **After**: Next.js App Router in `src/app/`
  - Standard Next.js file conventions
  - Automatic route generation
  - Cleaner folder structure

**Migration Examples**:

```
src/routes/__root.tsx      →  src/app/layout.tsx
src/routes/index.tsx       →  src/app/page.tsx
src/routes/about.tsx       →  src/app/about/page.tsx
```

### 3. Page Structure

- **Before**: Used `createRootRoute()` and `createFileRoute()` from TanStack
- **After**: Direct React components exported as default

**Before**:

```tsx
export const Route = createFileRoute("/")({
  head: () => ({ meta: [...] }),
  component: Index,
});

function Index() { ... }
```

**After**:

```tsx
"use client";

export default function Home() { ... }
```

### 4. Layout & Metadata

- **Before**: Metadata defined in route configuration
- **After**: Standard Next.js metadata export in layout

**Before**:

```tsx
head: () => ({
  meta: [{ title: "..." }],
  links: [...]
})
```

**After**:

```tsx
export const metadata: Metadata = {
  title: "...",
  description: "...",
};
```

### 5. Styling

- **Before**: Tailwind v4 with `@tailwindcss/vite` plugin
- **After**: Tailwind v4 with PostCSS
- **No Changes**: All styles, components, and design system remain the same

### 6. Component Locations

All components remain in the same location:

```
src/components/
├── ui/
├── BudgetBrainLogo.tsx
├── ConnectAccountDialog.tsx
├── ConnectAccountsMockup.tsx
├── DashboardPreview.tsx
├── FeatureCards.tsx
├── InsightsMockup.tsx
└── Navbar.tsx
```

### 7. Dependencies Changes

**Removed**:

- `@tanstack/react-start`
- `@tanstack/react-router`
- `@tanstack/router-plugin`
- `@tanstack/react-query` (use native React hooks)
- `@tailwindcss/vite`
- `@lovable.dev/vite-tanstack-config`
- `vite`
- `@vitejs/plugin-react`
- `vite-tsconfig-paths`

**Added**:

- `next` (v15.1.3)
- `eslint-config-next`
- `postcss`

**Kept**: All UI, styling, and animation dependencies

### 8. Client vs Server Components

Next.js uses React Server Components by default:

- Add `"use client"` at the top of files that need interactivity
- The home page (`app/page.tsx`) is already marked as a client component due to hooks

### 9. Error Handling

- **Before**: Part of TanStack Router setup
- **After**: Dedicated files in `src/app/`
  - `error.tsx` - Error boundary for runtime errors
  - `not-found.tsx` - Custom 404 page

### 10. Environment Variables

- **Before**: Environment-specific with Vite
- **After**: Standard Next.js env handling
  - `.env.local` for local development
  - `.env.example` for documentation

## Migration Steps Completed

1. ✅ Created `next.config.js` with Next.js configuration
2. ✅ Updated `tsconfig.json` for Next.js compatibility
3. ✅ Created `src/app/` directory structure
4. ✅ Created `src/app/layout.tsx` (root layout)
5. ✅ Created `src/app/page.tsx` (home page)
6. ✅ Created `src/app/error.tsx` (error boundary)
7. ✅ Created `src/app/not-found.tsx` (404 page)
8. ✅ Updated `package.json` with Next.js dependencies
9. ✅ Created `tailwind.config.ts` for CSS customization
10. ✅ Created `postcss.config.js` for PostCSS processing
11. ✅ Updated `.gitignore` for Next.js
12. ✅ Updated `README.md` with Next.js instructions
13. ✅ Created `.env.example` for environment configuration

## Deployment Changes

### Development

```bash
npm run dev  # Now starts Next.js dev server on port 3000
```

### Production

```bash
npm run build  # Creates optimized Next.js build
npm start      # Starts production server
```

### Deployment Options

- **Vercel** (Recommended): Push to Git, connect to Vercel
- **Docker**: Use `output: 'standalone'` in `next.config.js`
- **Self-hosted**: Deploy `npm start` to any Node.js server
- **Cloudflare Workers**: Requires `@opennextjs/cloudflare` adapter

## Breaking Changes for Developers

### No More Router Instance

**Before**:

```tsx
import { useRouter } from "@tanstack/react-router";
const router = useRouter();
router.navigate({ to: "/" });
```

**After**:

```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/");
```

### No More React Query by Default

Use native React hooks or install React Query if needed:

```tsx
// Simple state management
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

// Or install @tanstack/react-query
npm install @tanstack/react-query
```

### TypeScript Imports

TypeScript path aliases work the same:

```tsx
import { Button } from "@/components/ui/button"; // ✅ Still works
```

## Performance Improvements

1. **Built-in SSR**: Pages render on the server by default
2. **Automatic Code Splitting**: Each route is automatically split
3. **Image Optimization**: Use `next/image` for optimized images
4. **Font Optimization**: Use `next/font` for optimized fonts
5. **Bundle Analysis**: Use `@next/bundle-analyzer` to analyze builds

## Next Steps

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Test all pages**: Verify routing and functionality
4. **Update API routes**: If using backend, create `src/app/api/` routes
5. **Deploy**: Push to Git and deploy to Vercel or your hosting

## Troubleshooting

### Port Conflict

If port 3000 is in use:

```bash
PORT=3001 npm run dev
```

### Build Errors

Clear cache and rebuild:

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Hot Reload Not Working

Restart the dev server:

```bash
# Ctrl+C to stop
npm run dev
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Migration Date**: May 2026
**Framework**: Next.js 15
**React Version**: 19
