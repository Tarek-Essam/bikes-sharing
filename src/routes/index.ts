import express from 'express';
import stations from './snapshot';

const router: express.IRouter = express.Router();

router.use('/', stations);

export default router;
