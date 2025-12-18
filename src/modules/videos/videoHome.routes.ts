import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './videos.controller';
import Validator from './videos.validator';

const router = Router();

router
.route('/')
.get(
  //Validator.queryParams,
  Controller.getVideoHome,
)
// .post(
//   Validator.createOne,
//   Controller.createOne,
// );


export default router;