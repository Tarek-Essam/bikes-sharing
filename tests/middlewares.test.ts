import request from 'supertest';
import server from '../src';
import config from '../src/config';

describe('middlewares', () => {
  describe('not found middleware', () => {
    it('should return 404 if wrong route provides', async () => {
      const res = await request(server)
        .post('/api/v1/wrong')
        .set('Authorization', config.token)
        .expect(404);
      expect(res.body.code).toBe('NOT_FOUND');
    });
  });

  describe('autentication middleware', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(server)
        .get(`/api/v1/stations?at=${new Date()}`)
        .expect(401);
      expect(res.body.code).toBe('UNAUTHORIZED');
    });

    it('should return 401 if wrong token provided', async () => {
      const res = await request(server)
        .get(`/api/v1/stations/wrongId?at=${new Date()}`)
        .set('Authorization', 'wrong token')
        .expect(401);
      expect(res.body.code).toBe('UNAUTHORIZED');
    });
  });
});
