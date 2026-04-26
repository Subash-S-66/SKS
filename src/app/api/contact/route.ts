import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import { Message } from '@/models/Message';
import { mockMessages } from '@/data/mockDB';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
      if (process.env.USE_MOCK_DB !== 'true') {
        await dbConnect();
        await Message.create({ name, email, message });
      } else {
        mockMessages.push({ name, email, message, createdAt: new Date() });
      }
    } catch (e) {
      console.error("DB Error, continuing with email", e);
    }

    // Send emails
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: Number(process.env.EMAIL_PORT) || 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Email to Admin
      await transporter.sendMail({
        from: `"SKS Portfolio" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Lead: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<h3>New Lead from SKS Portfolio</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
      });

      // Auto-reply to Client
      await transporter.sendMail({
        from: `"SKS" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for reaching out to SKS',
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest,\nSKS`,
        html: `<h3>Hi ${name},</h3><p>Thank you for reaching out! I have received your message and will get back to you shortly.</p><p><strong>Your message:</strong><br>${message}</p><p>Best,<br>SKS</p>`,
      });
    } catch(emailError) {
       console.error("Email Error:", emailError);
       // We can return success if dev mode but log it
       if(process.env.NODE_ENV !== 'development') throw emailError;
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
