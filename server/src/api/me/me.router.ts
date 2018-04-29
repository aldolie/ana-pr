import { Router } from 'express';
import { controller } from './me.controller';
import { adminMiddleware } from '../../middleware';

let router = Router();

router.route('/')
    .get(controller.get)
    .put(controller.put);


export let meRouter = router;
