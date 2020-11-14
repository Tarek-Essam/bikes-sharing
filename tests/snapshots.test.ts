import request from 'supertest';
import server from '../src';
import config from '../src/config';
import {
  mockIndegoApi, mockWeatherApi, wipeDB, createSnapshots,
} from './helpers';
import sampleData from './sampleData';
import { Snapshot } from '../src/models';

describe('snapshots APIs', () => {
  beforeEach(async () => {
    await wipeDB();
  });

  describe('/api/v1/indego-data-fetch-and-store-it-db', () => {
    it('should create snapshot', async () => {
      const indegoScope = mockIndegoApi(sampleData.indegoRes);
      const weatherScope = mockWeatherApi(sampleData.weatherRes);
      const res = await request(server)
        .post('/api/v1/indego-data-fetch-and-store-it-db')
        .set('Authorization', config.token)
        .expect(200);
      const snapshot = await Snapshot.findById(res.body.snapshotId);
      expect(snapshot).toHaveProperty('at');
      expect(snapshot).toHaveProperty('stations');
      expect(snapshot).toHaveProperty('weather');
      indegoScope.persist(false);
      weatherScope.persist(false);
    });
  });

  describe('/api/v1/stations', () => {
    it('should return status 422 if time is not provided', async () => {
      const res = await request(server)
        .get('/api/v1/stations')
        .set('Authorization', config.token)
        .expect(422);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return status 404 if no snapshot matched in the provided time', async () => {
      const res = await request(server)
        .get(`/api/v1/stations?at=${new Date()}`)
        .set('Authorization', config.token)
        .expect(404);
      expect(res.body.code).toBe('NOT_FOUND');
    });

    it('should return status 200 and the matched snapshot', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const res = await request(server)
        .get(`/api/v1/stations?at=${snapshots[1].at}`)
        .set('Authorization', config.token)
        .expect(200);
      expect(snapshots[1].weather).toEqual(res.body.weather);
      expect(snapshots[1].stations).toEqual(res.body.stations);
      expect(snapshots[1].at).toEqual(snapshots[1].at);
    });
  });

  describe('/api/v1/stations/:kioskId', () => {
    it('should return status 404 if no snapshot matched in the provided time', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const { kioskId } = snapshots[1].stations[1].properties;
      const res = await request(server)
        .get(`/api/v1/stations/${kioskId}?at=${new Date()}`)
        .set('Authorization', config.token)
        .expect(404);
      expect(res.body.code).toBe('NOT_FOUND');
    });

    it('should return status 404 if no station matched the sent id', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const res = await request(server)
        .get(`/api/v1/stations/11111?at=${snapshots[1].at}`)
        .set('Authorization', config.token)
        .expect(404);
      expect(res.body.code).toBe('NOT_FOUND');
    });

    it('should return status 422 if time is not provided', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const { kioskId } = snapshots[1].stations[1].properties;
      const res = await request(server)
        .get(`/api/v1/stations/${kioskId}`)
        .set('Authorization', config.token)
        .expect(422);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return status 422 if kioskId is invalid', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const res = await request(server)
        .get(`/api/v1/stations/wrongId?at=${snapshots[1].at}`)
        .set('Authorization', config.token)
        .expect(422);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });

    it('should return status 200 and the matched station in a snapshot', async () => {
      const snapshots = createSnapshots();
      await Snapshot.insertMany(snapshots);
      const { kioskId } = snapshots[1].stations[1].properties;
      const res = await request(server)
        .get(`/api/v1/stations/${kioskId}?at=${snapshots[1].at}`)
        .set('Authorization', config.token)
        .expect(200);
      expect(snapshots[1].weather).toEqual(res.body.weather);
      expect(snapshots[1].stations[1]).toEqual(res.body.station);
      expect(snapshots[1].at).toEqual(snapshots[1].at);
    });
  });
});
