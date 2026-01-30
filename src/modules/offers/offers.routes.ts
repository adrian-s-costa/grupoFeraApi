import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './offers.controller';

const router = Router();

router
.route('/:lat&:lng')
.get(
  Controller.findAll,
)

router
.route('/notification')
.post(
  Controller.verifyNotification,
)

router
.route('/:id')
.get(
  Controller.findOne,
)

router
.route('/collabs')
.get(
  Controller.collab,
)

export default router;