import { Router } from 'express';
import { pledgeAction, unpledgeAction, getMyPledges, completeAction } from '../controllers/actions.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.post('/pledge', pledgeAction);
router.delete('/pledge/:actionId', unpledgeAction);
router.get('/pledges', getMyPledges);
router.patch('/complete/:actionId', completeAction);

export default router;
