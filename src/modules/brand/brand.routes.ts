import { Router } from 'express';
import Controller from './brand.controller';

const router = Router();

router
.route('/search')
.get(
  Controller.searchByName,
)

router
.route('/')
.post(
  Controller.create,
)

export default router;
