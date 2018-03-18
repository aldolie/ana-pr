import { Router } from 'express';
import { analysisRouter } from './analysis/analysis.router';
import { userRouter } from './user/user.router';
import { authRouter } from './auth/auth.router';
import { registrationRouter } from './registration/registration.router';
import { verificationRouter } from './verification/verification.router';

let router = Router();
router.use('/auth', authRouter );
router.use('/analyzes', analysisRouter);
router.use('/users', userRouter);
router.use('/registration', registrationRouter);
router.use('/verification', verificationRouter);

export let apiRouter = router;
