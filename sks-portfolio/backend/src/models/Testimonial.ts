import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  businessName: { type: String },
  avatarUrl: { type: String }, // Cloudinary URL
  rating: { type: Number, default: 5 },
  quote: { type: String, required: true },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
