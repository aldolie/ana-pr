import { Router } from 'express';
import { controller } from './analysis.controller';
import { adminMiddleware } from '../../middleware';

let router = Router();

router.route('/')
    .get(controller.get)
    .post(adminMiddleware, controller.post);

router.route('/:id')
    .get(controller.getById)
    .put(adminMiddleware, controller.put)
    .delete(adminMiddleware, controller.delete);

export let analysisRouter = router;
