import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Simple in-memory rate limiting for login
const rateLimit = new Map<string, { count: number, resetTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limit
    if (rateLimit.has(ip)) {
      const limitData = rateLimit.get(ip)!;
      if (now < limitData.resetTime) {
        if (limitData.count >= 5) {
          return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
        }
      } else {
        rateLimit.delete(ip);
      }
    }

    const { email, password } = await req.json();

    let isValid = false;
    let userId = 'mock_admin_id';

    if (process.env.USE_MOCK_DB === 'true') {
      if (email === 'admin@sks.com' && password === 'admin123') {
        isValid = true;
      }
    } else {
      await dbConnect();
      const user = await AdminUser.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        isValid = true;
        userId = user._id;
      }
    }

    if (!isValid) {
      // Update rate limit
      const currentLimit = rateLimit.get(ip) || { count: 0, resetTime: now + 15 * 60 * 1000 };
      currentLimit.count++;
      rateLimit.set(ip, currentLimit);

      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Success, clear rate limit
    rateLimit.delete(ip);

    // Create JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
