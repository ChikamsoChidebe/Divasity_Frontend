# Deployment Guide for Divasity Frontend

## Vercel Deployment

This project has been configured for easy deployment on Vercel. The following changes were made to fix deployment issues:

1. Fixed TypeScript errors:
   - Removed unused imports in multiple files
   - Fixed style tag in Signup.tsx
   - Removed unused variables
   - Added default exports for components imported as default

2. Added `vercel.json` configuration:
   - Configured proper build command
   - Added SPA routing support
   - Set output directory

3. Updated `tsconfig.json`:
   - Disabled `noUnusedLocals` and `noUnusedParameters` to prevent build errors

4. Added automated fix scripts:
   - Created scripts to automatically fix common TypeScript errors
   - Updated build process to run fixes before compilation

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the project settings from vercel.json
4. Deploy!

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build:vercel
   ```

2. The build output will be in the `dist` directory
3. Deploy this directory to your hosting provider

## Troubleshooting Deployment Issues

If you encounter TypeScript errors during deployment:

1. Run the fix script manually:
   ```bash
   npm run fix-ts
   ```

2. If specific files are causing issues, add them to the `fix-ts-errors.cjs` script

3. For import/export issues, ensure components are exported correctly:
   - Named exports: `export function Component() {...}`
   - Default exports: `export default Component`

## Local Development

To run the project locally:

```bash
npm install
npm run dev
```

## Building for Production

To build the project for production:

```bash
npm run build
```

The build output will be in the `dist` directory.