import { Router } from 'express';
import { createEnquiry, getEnquiries, replyToEnquiry } from '../controllers/enquiryController';
import { requireAuth } from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const router = Router();

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many enquiries from this IP, please try again after an hour' }
});

router.post('/', enquiryLimiter, createEnquiry);
router.get('/', requireAuth, getEnquiries);
router.post('/:id/reply', requireAuth, replyToEnquiry);

export default router;
