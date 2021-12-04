import express from 'express';
import { getRepository } from 'typeorm';
import Orphanage from './models/Orphanage';

import './database/connection';

const app = express();

app.use(express.json());

app.post('/orphanages', async (req, res) => {
  const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } =
    req.body;

  const orphanagesRepositiory = getRepository(Orphanage);

  const orphanage = orphanagesRepositiory.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  await orphanagesRepositiory.save(orphanage);

  return res.send({ messge: 'orphanage created' });
});

app.listen(3333);
