import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './payment.controller';

const router = Router();

router
.route('/')
.post(
  Controller.createPayment,
)

router
.route('/preference')
.post(
  Controller.createPreference,
)

router
.route('/teste')
.post(
  Controller.webhook,
)


export default router;