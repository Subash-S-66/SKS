# SKS Portfolio

A high-end freelance portfolio system built with Next.js 14 (App Router) and Tailwind CSS.
Features a visually stunning, futuristic design with soft glassmorphism, glowing accents, a floating interactive Chatbot, and a secure hidden admin panel.

## Features
- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion for smooth animations and transitions.
- **Backend:** Next.js API Routes.
- **Database:** MongoDB (Mongoose) with a simple fallback to a mock database if no URI is provided or `USE_MOCK_DB=true`.
- **Contact System:** NodeMailer integration with fallback to mockDB.
- **Admin Panel:** Secured via JWT cookies, rate limiting, and hidden access trigger (5-rapid clicks on bottom left footer).

## Environment Variables

Copy `.env.example` to `.env` and fill out your details:

`MONGODB_URI=mongodb://localhost:27017/sks-portfolio`
`JWT_SECRET=super_secret_jwt_key_change_in_production`
`EMAIL_HOST=smtp.ethereal.email`
`EMAIL_PORT=587`
`EMAIL_USER=ethereal_user`
`EMAIL_PASS=ethereal_pass`
`ADMIN_EMAIL=admin@sks.com`
`USE_MOCK_DB=true`

## Accessing Admin Panel
- To open the Admin Panel naturally, scroll down to the Footer and rapidly click the invisible area right next to the "SKS" logo 5 times.
- Alternatively, go directly to `/admin/login`.
- If `USE_MOCK_DB=true`, you can login using:
  - Email: `admin@sks.com`
  - Password: `admin123`

## Deployment
- Compatible with Vercel and similar edge/serverless platforms.
- Ensure all environment variables from `.env` are set in the Vercel dashboard.
- Update `JWT_SECRET` with a strong random string before deploying.
