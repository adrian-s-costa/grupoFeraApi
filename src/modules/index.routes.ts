import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.routes';
import AdminRoutes from './admin/admin.routes';
import AuthRoutes from './auth/auth.routes';
import ContactRoutes from './contact/contact.routes';
import FaqRoutes from './faq/faq.routes';
import TextRoutes from './text/text.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';
import VideoRouter from './videos/videos.routes'
import CourseRouter from './videos/courses.routes'

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/contact', ContactRoutes);
router.use('/faqs', FaqRoutes);
router.use('/texts', TextRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/videos', VideoRouter);
router.use('/courses', CourseRouter);


export default router;
