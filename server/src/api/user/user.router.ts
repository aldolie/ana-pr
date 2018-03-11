import { Router } from 'express';
import { controller } from './user.controller';

let router = Router();

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getById);

export let userRouter = router;
