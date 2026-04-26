import { Router } from 'express';
import * as contentController from '../controllers/contentController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public reads
router.get('/services', contentController.getServices);
router.get('/projects', contentController.getProjects);
router.get('/testimonials', contentController.getTestimonials);
router.get('/settings', contentController.getSettings);

// Protected writes
router.use(requireAuth);

router.post('/services', contentController.createService);
router.put('/services/:id', contentController.updateService);
router.delete('/services/:id', contentController.deleteService);

router.post('/projects', contentController.createProject);
router.put('/projects/:id', contentController.updateProject);
router.delete('/projects/:id', contentController.deleteProject);

router.post('/testimonials', contentController.createTestimonial);
router.put('/testimonials/:id', contentController.updateTestimonial);
router.delete('/testimonials/:id', contentController.deleteTestimonial);

router.put('/settings', contentController.updateSettings);

export default router;
