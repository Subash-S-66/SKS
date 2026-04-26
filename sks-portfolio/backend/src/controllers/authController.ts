import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser';
import { LoginLog } from '../models/LoginLog';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 30;

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  try {
    const user = await AdminUser.findOne({ username });

    if (!user) {
      await LoginLog.create({ ip, status: 'Failure' });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      await LoginLog.create({ ip, status: 'Lockout' });
      const remainingTime = Math.ceil((user.lockUntil.getTime() - Date.now()) / 1000 / 60);
      return res.status(403).json({ error: `Account locked. Try again in ${remainingTime} minutes.` });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      user.failedLoginAttempts += 1;
      let errorMsg = 'Invalid credentials';

      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
        user.failedLoginAttempts = 0;
        errorMsg = 'Too many failed attempts. Account locked for 30 minutes.';
        await LoginLog.create({ ip, status: 'Lockout' });
      } else if (user.failedLoginAttempts >= 2) {
        errorMsg = `Invalid credentials. ${MAX_ATTEMPTS - user.failedLoginAttempts} attempts remaining.`;
        await LoginLog.create({ ip, status: 'Failure' });
      } else {
        await LoginLog.create({ ip, status: 'Failure' });
      }

      await user.save();
      return res.status(401).json({ error: errorMsg });
    }

    // Success
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    await LoginLog.create({ ip, status: 'Success' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
