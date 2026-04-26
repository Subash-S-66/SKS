import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  problem: String,
  solution: String,
  result: String,
  techStack: [String],
  images: [String], // Cloudinary URLs
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
