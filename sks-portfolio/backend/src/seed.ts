import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { AdminUser } from './models/AdminUser';
import { Service } from './models/Service';
import { Project } from './models/Project';
import { Testimonial } from './models/Testimonial';
import { Settings } from './models/Settings';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sks-services');
    console.log('Connected to MongoDB');

    // Clear existing data
    await AdminUser.deleteMany({});
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Settings.deleteMany({});

    // Seed Admin User
    const passwordHash = await bcrypt.hash('Admin@SKS2024', 10);
    await AdminUser.create({
      username: 'admin',
      passwordHash
    });
    console.log('Admin user seeded.');

    // Seed Settings
    await Settings.create({
      primaryAccent: '#00D4FF',
      secondaryAccent: '#7C3AED',
      themePreset: 'Cyber',
      heroHeadline: 'SKS Services',
      heroTaglines: ['Web Development', 'Business Websites', 'Online Booking Systems', 'E-Commerce Solutions', 'Digital Transformation'],
      heroCtaPrimaryLabel: 'See My Work',
      heroCtaSecondaryLabel: 'Get a Free Quote',
      aboutText: 'We build world-class, jaw-dropping portfolio and business platforms for SKS Services — a web development & digital solutions freelancing business. This is genuinely stunning, unlike anything seen before. Quality over speed.',
      aboutStats: [
        { label: 'Projects Completed', value: '50+' },
        { label: 'Happy Clients', value: '30+' },
        { label: 'Years Experience', value: '5+' },
        { label: 'Services Offered', value: '15' }
      ]
    });
    console.log('Settings seeded.');

    // Seed Services
    const services = [
      { name: 'Business Website', shortDescription: 'Clean professional site, mobile-ready.', icon: '💻', order: 1 },
      { name: 'Customer Enquiries System', shortDescription: 'Contact forms, instant lead delivery.', icon: '📧', order: 2 },
      { name: 'Online Booking', shortDescription: 'Time slot booking, auto-confirmations.', icon: '📅', order: 3 },
      { name: 'Online Selling / E-Commerce', shortDescription: 'Product listings, secure payments.', icon: '🛒', order: 4 },
      { name: 'Customer Accounts', shortDescription: 'Login, order history, saved details.', icon: '👤', order: 5 },
      { name: 'Business Control Panel', shortDescription: 'Unified dashboard to manage everything.', icon: '🎛️', order: 6 },
      { name: 'Notifications System', shortDescription: 'Instant alerts for bookings/orders.', icon: '🔔', order: 7 },
      { name: 'Business Growth Tracking', shortDescription: 'Analytics, reports, customer activity.', icon: '📈', order: 8 },
      { name: 'Customer Feedback', shortDescription: 'Reviews, testimonials, trust building.', icon: '⭐', order: 9 },
      { name: 'Location & Maps', shortDescription: 'Google Maps integration, directions.', icon: '🗺️', order: 10 },
      { name: 'Chat Support', shortDescription: 'Live chat widget, quick responses.', icon: '💬', order: 11 },
      { name: 'Design & Experience', shortDescription: 'UI/UX, brand identity, modern design.', icon: '🎨', order: 12 },
      { name: 'Performance & Compatibility', shortDescription: 'Speed optimisation, cross-device.', icon: '⚡', order: 13 },
      { name: 'Online Visibility / SEO', shortDescription: 'Google ranking, search optimisation.', icon: '🔍', order: 14 },
      { name: 'Extra Benefits', shortDescription: '6 months free hosting, secure systems.', icon: '🎁', order: 15 }
    ];
    await Service.insertMany(services);
    console.log('Services seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'E-Commerce Platform', category: 'E-Commerce', shortDescription: 'A fully functional online store.',
        problem: 'Client needed an online presence.', solution: 'Built a custom e-commerce solution.', result: 'Increased sales by 200%.',
        techStack: ['Next.js', 'Stripe', 'MongoDB'], featured: true
      },
      {
        title: 'Clinic Booking System', category: 'Booking', shortDescription: 'Appointment management for a local clinic.',
        problem: 'Manual booking was inefficient.', solution: 'Automated booking and reminders.', result: 'Reduced no-shows by 50%.',
        techStack: ['React', 'Node.js', 'PostgreSQL'], featured: true
      },
      {
        title: 'Restaurant Website', category: 'Portfolio', shortDescription: 'Showcase and menu for a fine dining restaurant.',
        problem: 'Outdated website without mobile support.', solution: 'Modern, responsive redesign.', result: 'Improved customer engagement.',
        techStack: ['Next.js', 'Tailwind', 'Framer Motion'], featured: false
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // Seed Testimonials
    const testimonials = [
      { clientName: 'Alice Smith', businessName: 'Alice Boutique', rating: 5, quote: 'SKS Services completely transformed our online presence!' },
      { clientName: 'Bob Johnson', businessName: 'Johnson Dental', rating: 5, quote: 'The booking system is flawless. Highly recommend.' },
      { clientName: 'Charlie Davis', businessName: 'Davis Consulting', rating: 4, quote: 'Professional, timely, and excellent quality.' }
    ];
    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded.');

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
