import { Router } from 'express';
import { controller } from './verification.controller';

let router = Router();


router.route('/')
    .get(controller.activateUser);


export let verificationRouter = router;
