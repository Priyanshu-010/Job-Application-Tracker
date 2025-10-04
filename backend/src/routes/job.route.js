import express from 'express';
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from '../controllers/job.contoller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllJobs)
router.get('/:id', authMiddleware, getJob)
router.post('/', authMiddleware, createJob)
router.put('/:id', authMiddleware, updateJob)
router.delete('/:id', authMiddleware, deleteJob)
  
export default router;