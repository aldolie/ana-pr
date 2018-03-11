import { Router } from 'express';
import { controller } from './auth.controller';

let router = Router();

router.route('/login')
    .post(controller.login);


export let authRouter = router;
