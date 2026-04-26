import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  businessType: String,
  serviceInterestedIn: String,
  budgetRange: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Replied', 'Closed'], default: 'New' },
  replies: [{
    message: String,
    sentAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
