import { Router } from 'express';
import Controller from './dealership.controller';

const router = Router();

router
.route('/')
.post(
  Controller.create,
)
.get(
  Controller.findAll,
)

router
.route('/:id')
.get(
  Controller.findById,
)

export default router;
