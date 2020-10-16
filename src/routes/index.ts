/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import multer from 'multer';
import orphanage from './orphanages.routes';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);
routes.use('/orphanages', upload.array('images'), orphanage);

export default routes;
