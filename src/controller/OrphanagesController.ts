/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

export async function index(req: Request, res: Response) {
  const orphanagesRepository = getRepository(Orphanage);
  const orphanage = await orphanagesRepository.find({
    relations: ['images'],
  });
  return res.json(OrphanageView.renderMany(orphanage));
}
export async function show(req: Request, res: Response) {
  const { id } = req.params;
  const orphanagesRepository = getRepository(Orphanage);
  const orphanage = await orphanagesRepository.findOneOrFail(id, {
    relations: ['images'],
  });
  return res.json(OrphanageView.render(orphanage));
}

export async function create(req: Request, res: Response) {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = req.body;

  const orphanagesRepository = getRepository(Orphanage);
  const requestImages = req.files as Express.Multer.File[];
  const images = requestImages.map((image) => ({ path: image.filename }));

  const data = {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  };

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
      }),
    ),
  });

  await schema.validate(data, {
    abortEarly: false,
  });

  const orphanage = orphanagesRepository.create(data);

  await orphanagesRepository.save(orphanage);

  return res.status(201).json(orphanage);
}
