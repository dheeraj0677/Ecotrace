import { Router } from 'express';
import { getLeaderboard, getMyRank } from '../controllers/leaderboard.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getLeaderboard);
router.get('/my-rank', protect, getMyRank);

export default router;
