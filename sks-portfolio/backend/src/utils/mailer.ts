import nodemailer from 'nodemailer';
import { Settings } from '../models/Settings';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const settings = await Settings.findOne();
  if (!settings || !settings.smtpHost || !settings.smtpUser) {
    console.warn("SMTP settings are not configured. Email will not be sent.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort || 465,
    secure: settings.smtpPort === 465,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"SKS Services" <${settings.smtpUser}>`,
    to,
    subject,
    html,
  });
};
