import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './videos.controller';
import Validator from './videos.validator';

const router = Router();

router
.route('/')
.get(
  Controller.getCourses,
)

router
.route('/:id')
.get(
  Controller.getCourseById,
)

router
.route('/:id/comment')
.post(
  Validator.postComment,
  Controller.postCourseComment,
)

export default router;