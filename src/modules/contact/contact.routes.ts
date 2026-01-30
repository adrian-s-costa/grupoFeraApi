import { Router } from 'express';

import Controller from '../offers/offers.controller';


const router = Router();

router
.route('/')
.get(Controller.collab);



export default router;
