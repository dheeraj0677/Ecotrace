import { Router } from 'express';
import { saveFootprint, getHistory, getLatest, deleteFootprint } from '../controllers/footprint.controller.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { saveFootprintSchema } from '../validators/footprint.validators.js';

const router = Router();

router.use(protect);

router.post('/', validate(saveFootprintSchema), saveFootprint);
router.get('/history', getHistory);
router.get('/latest', getLatest);
router.delete('/:id', deleteFootprint);

export default router;
