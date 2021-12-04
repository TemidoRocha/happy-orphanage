import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanage_view';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepositiory = getRepository(Orphanage);

    const orphanage = await orphanagesRepositiory.find({
      relations: ['images'],
    });

    return res.status(200).json(orphanageView.renderMany(orphanage));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepositiory = getRepository(Orphanage);

    const orphanage = await orphanagesRepositiory.findOneOrFail(id, { relations: ['images'] });

    return res.status(200).json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } =
      req.body;

    const orphanagesRepositiory = getRepository(Orphanage);

    // even if we see it as an array, it is giving error. We define it in order to avoid
    // the error
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const newOrphanage = {
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
      // name: Yup.string().required('nome obrigatótio'), // to change the error message
      name: Yup.string().required('nome obrigatótio'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(newOrphanage, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepositiory.create(newOrphanage);

    await orphanagesRepositiory.save(orphanage);

    return res.status(201).json(orphanage);
  },
};
