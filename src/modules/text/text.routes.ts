import { Router } from 'express';

import Auth from '@middlewares/auth.middleware';
import Controller from './text.controller';
import Validator from './text.validator';
import videosController from '@modules/videos/videos.controller';

const router = Router();

router
.route('/')
.all(
  Validator.queryParams,
)
.get(
  Controller.findOne,
)
.put(
  Auth.authentication, Auth.roles('admin'),
  Validator.updateOne,
  Controller.updateOne,
)

router
.route('/categories')
.get(
  videosController.getAllCategories
)

router
.route('/home/categories')
.get(
  videosController.getHomeCategories
)

router
.route('/home/campaigns')
.get(
  videosController.getCampaigns
)

router
.route('/home/campaigns/:id')
.get(
  videosController.findOneCampaign
)

router
.route('/home/category/:filter')
.get(
  videosController.findCategoryContent
)

router
.route('/home/category/content/:id')
.get(
  videosController.findOneCategoryContent
)

router
.route('/home/category/content/:id/dashboard')
.get(
  videosController.findOneCategoryContentByUserId
)

router
.route('/home/category/content/:id/dashboard/custom')
.post(
  videosController.findOneCategoryContentCustom
)



export default router;
