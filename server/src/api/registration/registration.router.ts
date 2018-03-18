import { Router } from 'express';
import { controller } from './registration.controller';

let router = Router();


router.route('/')
    .post(controller.post);


export let registrationRouter = router;
