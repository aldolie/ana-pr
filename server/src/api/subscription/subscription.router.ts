import { Router } from 'express';
import { controller } from './subscription.controller';
import {adminMiddleware} from "../../middleware/admin-middleware";

let router = Router();

router.route('/')
    .post(controller.post);
router.route('/cancel/:id')
    .put(controller.cancel);
router.route('/history')
    .get(controller.getLatest);

router.use(adminMiddleware);

router.route('/')
    .get(controller.get);
router.route('/:status')
    .get(controller.getByStatus);
router.route('/respond/:id')
    .put(controller.setStatus);


export let subscriptionRouter = router;