import { Router } from 'express';
import { controller } from './user.controller';
import { adminMiddleware } from '../../middleware';

let router = Router();

router.use(adminMiddleware);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getById)
    .put(controller.put);

export let userRouter = router;
