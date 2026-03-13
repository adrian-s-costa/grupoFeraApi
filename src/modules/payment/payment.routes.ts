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
  Controller.webhookPreapproval,
)

router
.route('/push')
.post(
  Controller.push,
)

router
.route('/save-sub')
.post(
  Controller.saveSubs,
)

router
.route('/preapproval')
.post(
  Controller.createPreapproval,
)

router
.route('/alamo')
.post(
  Controller.createPreapproval,
)

export default router;