/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import { Router } from 'express';
import { create, index, show } from '../controller/OrphanagesController';

const orphanageRoutes = Router();
orphanageRoutes.post('/', create);
orphanageRoutes.get('/', index);
orphanageRoutes.get('/:id', show);

export default orphanageRoutes;
