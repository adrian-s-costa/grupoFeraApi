import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './offers.controller';

const router = Router();

router
.route('/')
.get(
  Controller.findAll,
)

router
.route('/:id')
.get(
  Controller.findOne,
)

export default router;