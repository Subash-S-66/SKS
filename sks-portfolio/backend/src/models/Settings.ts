import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  primaryAccent: { type: String, default: '#00D4FF' },
  secondaryAccent: { type: String, default: '#7C3AED' },
  themePreset: { type: String, default: 'Cyber' },
  heroHeadline: { type: String, default: 'SKS Services' },
  heroTaglines: { type: [String], default: ['Web Development', 'Business Websites', 'Online Booking Systems', 'E-Commerce Solutions', 'Digital Transformation'] },
  heroCtaPrimaryLabel: { type: String, default: 'See My Work' },
  heroCtaSecondaryLabel: { type: String, default: 'Get a Free Quote' },
  aboutText: { type: String, default: 'Welcome to SKS Services. We build world-class digital platforms.' },
  aboutStats: [{
    label: String,
    value: String
  }],
  contactEmail: { type: String },
  contactPhone: { type: String },
  whatsappNumber: { type: String },
  footerTagline: { type: String, default: 'Digital Excellence' },
  socialLinks: {
    linkedin: String,
    instagram: String,
    twitter: String,
    github: String,
    facebook: String
  },
  cloudinaryCloudName: String,
  cloudinaryApiKey: String,
  cloudinaryApiSecret: String,
  smtpHost: String,
  smtpPort: Number,
  smtpUser: String,
  smtpPass: String
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);
