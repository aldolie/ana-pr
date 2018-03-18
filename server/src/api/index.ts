import { Router } from 'express';
import { analysisRouter } from './analysis/analysis.router';
import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';
import { registrationRouter } from './registration/registration.router';

let router = Router();
router.use('/auth', authRouter );
router.use('/analyzes', analysisRouter);
router.use('/users', userRouter);
router.use('/registration', registrationRouter);

export let apiRouter = router;
