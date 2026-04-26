import { Request, Response } from 'express';
import { Enquiry } from '../models/Enquiry';
import { Settings } from '../models/Settings';
import { sendEmail } from '../utils/mailer';

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    const settings = await Settings.findOne();

    // Email to Admin
    if (settings && settings.contactEmail) {
      await sendEmail(
        settings.contactEmail,
        `New Enquiry from ${enquiry.name}`,
        `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Service:</strong> ${enquiry.serviceInterestedIn || 'N/A'}</p>
          <p><strong>Message:</strong> ${enquiry.message}</p>
        `
      ).catch(e => console.error("Admin notification email failed:", e));
    }

    // Confirmation Email to Client
    await sendEmail(
      enquiry.email,
      `We've received your enquiry - SKS Services`,
      `
        <h2>Thank you for reaching out, ${enquiry.name}!</h2>
        <p>We have successfully received your enquiry regarding <strong>${enquiry.serviceInterestedIn || 'our services'}</strong>.</p>
        <p>Our team will review your message and get back to you within 24 hours.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>SKS Services</strong></p>
      `
    ).catch(e => console.error("Client confirmation email failed:", e));

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create enquiry' });
  }
};

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};

export const replyToEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });

    enquiry.replies.push({ message, sentAt: new Date() });
    enquiry.status = 'Replied';
    await enquiry.save();

    await sendEmail(
      enquiry.email,
      `Re: Your enquiry to SKS Services`,
      `
        <p>${message}</p>
        <br/>
        <hr/>
        <p><i>Your original message:</i></p>
        <p>${enquiry.message}</p>
      `
    ).catch(e => console.error("Reply email failed:", e));

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reply to enquiry' });
  }
};
