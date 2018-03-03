import { Router } from 'express';
import { analysisRouter } from './analysis/analysis.router';

let router = Router();
router.use('/analyzes', analysisRouter);

export let apiRouter = router;
