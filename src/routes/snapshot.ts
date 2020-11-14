import express from 'express';
import {
  createStationsSnapshot,
  getSnapshot,
  getSingleStation,
} from '../controllers/snapshot';
import validate from '../helpers/validator';

const stationRoutes: express.IRouter = express.Router();

const getStationsSchema = {
  type: 'object',
  required: ['at'],
  properties: {
    at: { type: 'string' },
  },
};

const getSingleStationSchema = {
  type: 'object',
  required: ['kioskId'],
  properties: {
    kioskId: { type: 'integer' },
  },
};

stationRoutes.post(
  '/indego-data-fetch-and-store-it-db',
  async (req: express.Request, res: express.Response) => {
    const snapshot = await createStationsSnapshot();
    res.status(200).json({ snapshotId: snapshot._id });
  },
);

stationRoutes.get(
  '/stations',
  validate('query', getStationsSchema),
  async (req: express.Request, res: express.Response) => {
    const { at: snapshotTime } = req.query;
    const snapshot = await getSnapshot(snapshotTime as string);
    res.json(snapshot);
  },
);

stationRoutes.get(
  '/stations/:kioskId',
  [validate('params', getSingleStationSchema), validate('query', getStationsSchema)],
  async (req: express.Request, res: express.Response) => {
    const { query: { at: snapshotTime }, params: { kioskId } } = req;
    const snapshot = await getSingleStation(snapshotTime as string, +kioskId);
    res.json(snapshot);
  },
);

export default stationRoutes;
