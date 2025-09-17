import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './videos.controller';
import Validator from './videos.validator';

const router = Router();

router
.route('/')
.get(
  //Validator.queryParams,
  Controller.findAllShows,
)
// .post(
//   Validator.createOne,
//   Controller.createOne,
// );

router
.route('/:id')
.get(
  Controller.findOneShow,
)
// .put(
//   Validator.updateOne,
//   Controller.updateOne,
// )
// .delete(
//   Controller.deleteOne,
// );

export default router;