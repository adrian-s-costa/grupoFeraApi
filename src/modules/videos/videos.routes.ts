
import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './videos.controller';
import Validator from './videos.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
// .post(
//   Validator.createOne,
//   Controller.createOne,
// );

router
.route('/:id')
.get(
  Controller.findOne,
)
// .put(
//   Validator.updateOne,
//   Controller.updateOne,
// )
// .delete(
//   Controller.deleteOne,
// );

router
.route('/:id/comment')
.post(
  Validator.postComment,
  Controller.postComment,
)

router
.route('/:id/like/:action')
.post(
  Controller.postLike,
)

router
.route('/:id/view/')
.post(
  Controller.postView,
)

router
.route('/:id/campaign/view')
.post(
  Controller.postViewCampaign,
)

router
.route('/:id/contact')
.post(
  Controller.postContact,
)

router
.route('/:id/comment/:commentId')
.post(
  Controller.postAnswer,
)

export default router;
