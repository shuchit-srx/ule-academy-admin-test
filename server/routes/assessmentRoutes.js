import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    listAssessments,
    getAssessmentReport
} from '../controllers/assessmentController.js';

const router = express.Router();

router.get('/', protect, listAssessments);
router.get('/:id', protect, getAssessmentReport);

export default router;
