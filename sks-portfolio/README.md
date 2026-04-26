# SKS Services Portfolio & Admin Platform

## Prerequisites
- Node.js >= 18
- pnpm >= 8 (Install with `npm install -g pnpm`)
- MongoDB (Local or Atlas)
- Docker & Docker Compose (Optional, for production deployment)

## Local Development Setup

1. **Install dependencies** (from the root folder):
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` in the `backend` folder and configure them. Do the same for `.env.local.example` to `.env.local` in the `frontend` folder.

3. **Database Seeding**:
   Run the seed script to populate the database with default data and the admin user:
   ```bash
   pnpm run seed
   ```

4. **Start Development Servers**:
   ```bash
   # Starts both frontend and backend concurrently
   pnpm dev:frontend
   # In a new terminal
   pnpm dev:backend
   ```

## Admin Setup
- Default Admin Username: `admin`
- Default Admin Password: `Admin@SKS2024`
*(Change this upon first login!)*

## Deployment
See specific `README` documents for Vercel (Frontend), Render (Backend), and Docker deployment steps.
