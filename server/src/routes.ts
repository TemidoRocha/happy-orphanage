import { Router } from 'express';
import OrphanageControllers from './controllers/OrphanageControllers';

const routes = Router();

routes.post('/orphanages', OrphanageControllers.create);

export default routes;
