import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  icon: { type: String }, // emoji or Cloudinary URL
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Service = mongoose.model('Service', serviceSchema);
