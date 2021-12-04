import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepositiory = getRepository(Orphanage);

    const orphanage = await orphanagesRepositiory.find();

    return res.status(200).json(orphanage);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepositiory = getRepository(Orphanage);

    const orphanage = await orphanagesRepositiory.findOneOrFail(id);

    return res.status(200).json(orphanage);
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

    const orphanage = orphanagesRepositiory.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    await orphanagesRepositiory.save(orphanage);

    return res.status(201).json(orphanage);
  },
};
