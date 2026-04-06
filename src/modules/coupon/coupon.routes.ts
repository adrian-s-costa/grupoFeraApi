import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './coupon.controller';
import Validator from './coupon.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.authentication, Auth.roles('admin'),
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.get(Controller.findOne)
.put(
  Auth.authentication, Auth.roles('admin'),
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.authentication, Auth.roles('admin'),
  Controller.deleteOne,
);

export default router;