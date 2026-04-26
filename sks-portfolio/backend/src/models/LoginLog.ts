import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  status: { type: String, enum: ['Success', 'Failure', 'Lockout'], required: true },
  timestamp: { type: Date, default: Date.now }
});

export const LoginLog = mongoose.model('LoginLog', loginLogSchema);
