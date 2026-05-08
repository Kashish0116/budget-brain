# Budget Brain

A modern budget management and financial insights application built with Next.js, React, and Tailwind CSS.

## 📋 Overview

Budget Brain is a full-stack web application that helps users manage their finances intelligently. It features a beautiful UI built with Radix UI components, Tailwind CSS, and supports real-time data visualization with Recharts.

### Tech Stack

- **Frontend Framework**: Next.js 15 with React 19
- **Routing**: Next.js App Router
- **UI Components**: Radix UI with Tailwind CSS
- **State Management**: React Hooks (built-in)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4 with custom animations
- **Build Tool**: Next.js
- **Package Manager**: npm (or yarn/bun)

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js), **yarn**, or **bun** package manager
  - For Bun: `curl -fsSL https://bun.sh/install | bash`

### Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd budget-brain
   ```

2. **Install dependencies**:

   **Using npm** (recommended if you don't have bun/yarn):

   ```bash
   npm install
   ```

   **Using yarn**:

   ```bash
   yarn install
   ```

   **Using bun** (fastest option):

   ```bash
   bun install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun run dev
   ```

   The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
budget-brain/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   ├── error.tsx           # Error boundary
│   │   └── not-found.tsx       # 404 page
│   ├── components/
│   │   ├── ui/                 # Reusable Radix UI components
│   │   ├── BudgetBrainLogo.tsx
│   │   ├── ConnectAccountDialog.tsx
│   │   ├── ConnectAccountsMockup.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── FeatureCards.tsx
│   │   ├── InsightsMockup.tsx
│   │   └── Navbar.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── styles.css              # Global styles
│   └── (other assets)
├── public/                      # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🛠️ Available Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start development server with hot reload |
| `npm run build`  | Build for production                     |
| `npm start`      | Start production server                  |
| `npm run lint`   | Run ESLint to check code quality         |
| `npm run format` | Format code with Prettier                |

## 🎯 Key Features

### Components

- **UI Library**: Complete set of Radix UI components (accordion, dialog, form, table, chart, etc.)
- **Responsive Design**: Mobile-friendly with the `use-mobile` hook
- **Dashboard Preview**: Visual mockup of the dashboard interface
- **Connection Dialog**: Account connection interface
- **Feature Cards**: Showcase application features
- **Insights Mockup**: Data visualization examples

### Styling

- **Tailwind CSS v4**: Utility-first CSS framework
- **Dark Mode Support**: Built-in dark mode capabilities
- **Animations**: CSS animations with `tw-animate-css` and Framer Motion
- **Custom Theming**: Configurable color schemes

## 🔧 Configuration Files

### `next.config.js`

Contains Next.js configuration including:

- React Strict Mode enabled
- Minification with SWC
- Standalone output for Docker deployment

### `tailwind.config.ts`

Tailwind CSS v4 configuration with:

- Custom color system using CSS variables
- Theme extensions (gradients, shadows)
- Custom border radius system

### `tsconfig.json`

TypeScript configuration for Next.js with:

- Strict mode enabled
- Path aliases (@/)
- Next.js type support

## 📦 Dependencies Overview

### Core

- `next@15.1.3` - React framework
- `react@19.2.0` - UI library
- `react-dom@19.2.0` - React DOM utilities

### UI & Styling

- `@radix-ui/*` - Accessible component primitives
- `tailwindcss@4.2.1` - Utility-first CSS
- `lucide-react@0.575.0` - Icon library
- `framer-motion@12.38.0` - Animation library

### Forms & Validation

- `react-hook-form@7.71.2` - Form state management
- `zod@3.24.2` - TypeScript-first schema validation
- `@hookform/resolvers@5.2.2` - Form resolver for Zod

### Data & Charts

- `recharts@2.15.4` - React charting library
- `date-fns@4.1.0` - Date utility library

### Other

- `sonner@2.0.7` - Toast notifications
- `vaul@1.1.2` - Drawer component
- `cmdk@1.1.1` - Command menu
- `class-variance-authority@0.7.1` - Component variant system
- `clsx@2.1.1` - Conditional classname utility
- `tailwind-merge@3.5.0` - Merge Tailwind classes

## 🌐 Environment Setup

### Development Environment

- Local development server runs on `http://localhost:3000`
- Fast Refresh enabled for instant updates
- ESLint configured for code quality
- Prettier configured for code formatting

### Production Build

The production build creates:

- Optimized React bundle
- Server-side rendering (SSR) via Next.js
- Standalone server for deployment
- Image and font optimization

## 📝 Development Workflow

1. **Make changes** to files in `src/`
2. **Save files** - Next.js will hot reload automatically
3. **Run lint** to check code quality:
   ```bash
   npm run lint
   ```
4. **Format code** (optional):
   ```bash
   npm run format
   ```
5. **Build and test** before deployment:
   ```bash
   npm run build
   npm start
   ```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub/GitLab
2. Connect your repository to Vercel: https://vercel.com
3. Vercel will automatically detect Next.js and deploy

### Deploy to Docker

The project is configured with `output: 'standalone'` for Docker deployment:

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY .next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
```

### Deploy to Other Platforms

Next.js can be deployed to any platform supporting Node.js:

- Self-hosted servers
- Netlify
- AWS Lambda / EC2
- DigitalOcean
- Railway
- Render
- And many more...

## 🔍 Troubleshooting

### Port Already in Use

If port 3000 is already in use, Next.js will prompt to use another port or you can specify:

```bash
PORT=3001 npm run dev
```

### Node Version Issues

Ensure you're using Node.js v18 or higher:

```bash
node --version
```

### Dependencies Not Installing

Clear cache and reinstall:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear the build cache:

```bash
rm -rf .next
npm run build
```

### Hot Reload Not Working

Restart the development server:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

## 📚 Next.js Best Practices

This project follows Next.js best practices including:

- **Server Components**: Used by default for better performance
- **Client Components**: Marked with `"use client"` when needed
- **Image Optimization**: Using Next.js `Image` component
- **Font Optimization**: Using `next/font` for Google Fonts
- **Code Splitting**: Automatic route-based code splitting
- **Metadata**: Static and dynamic metadata with `generateMetadata`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m 'Add your feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is private and part of a minor project.

## 🆘 Support

For issues or questions, please check the project documentation or reach out to the development team.

---

**Last Updated**: May 2026
**Framework**: Next.js 15
**React Version**: 19
