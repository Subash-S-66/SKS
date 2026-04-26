import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sks-portfolio';

const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  icon: String,
  isActive: { type: Boolean, default: true },
  order: Number
});

const AdminUserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Seed Admin
    await AdminUser.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await AdminUser.create({
      email: 'admin@sks.com',
      password: hashedPassword
    });
    console.log('Admin user created: admin@sks.com / admin123');

    // Seed Services
    await Service.deleteMany({});
    const services = [
      {
        title: "Business Website Creation",
        description: "High-end, responsive websites designed to convert visitors into clients.",
        features: ["6 Months Free Hosting", "Works on All Devices", "Google Visibility (SEO Ready)"],
        icon: "Globe",
        order: 1
      },
      {
        title: "Online Booking & Appointment Systems",
        description: "Seamless scheduling solutions integrated directly into your platform.",
        features: ["Automated Reminders", "Calendar Sync", "Fast & Secure"],
        icon: "Calendar",
        order: 2
      },
      {
        title: "E-commerce & Online Selling",
        description: "Complete online stores with secure payment gateways and inventory management.",
        features: ["Secure Payments", "Admin Control System", "Mobile Optimized"],
        icon: "ShoppingBag",
        order: 3
      },
      {
        title: "Customer Management Systems",
        description: "Custom dashboards to manage your clients, leads, and business operations.",
        features: ["Data Automation", "Analytics Dashboard", "Secure Access"],
        icon: "Users",
        order: 4
      }
    ];
    await Service.insertMany(services);
    console.log('Services seeded');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
