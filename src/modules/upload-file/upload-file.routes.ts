import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import multer from 'multer';
//import multerOptions from '@config/storage';
import Controller from './upload-file.controller';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = Router();

router
.route('/')
.post(
  upload.single('image'),
  Controller.upload,
);

router
.route("/teste/:archive/:type")
.get(
  Controller.generateSignedUrl
)

export default router;
