import express from 'express';
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from '../controllers/job.contoller.js';

const router = express.Router();

router.get('/', getAllJobs)
router.get('/:id', getJob)
router.post('/', createJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)
  
export default router;