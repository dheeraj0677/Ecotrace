import { Router } from 'express';
import { getProfile, updateProfile, deleteAccount, getPublicScore } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);
router.get('/public/:userId', getPublicScore);

export default router;
