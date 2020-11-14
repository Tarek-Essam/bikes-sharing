import nock from 'nock';
import mongoose from 'mongoose';

export const mockIndegoApi = (res: any) => nock('https://kiosks.bicycletransit.workers.dev')
  .persist()
  .get('/phl')
  .reply(200, res);

export const mockWeatherApi = (res: any) => nock('https://api.openweathermap.org')
  .persist()
  .get(/\/*/)
  .reply(200, res);

export const wipeDB = async () => {
  const promises = Object.values(mongoose.models).map((Model) => Model.deleteMany({}));
  return Promise.all(promises);
};

export const generateSnapshot = (stations, temp, at) => ({
  at,
  stations: stations.map((station) => ({
    properties: station,
  })),
  weather: {
    name: 'Philadelphia',
    main: {
      temp,
    },
  },
});

export const createSnapshots = () => {
  const stations = [
    { kioskId: 1, name: 'station 1' },
    { kioskId: 2, name: 'station 2' },
    { kioskId: 3, name: 'station 3' },
  ];
  const snapshotsInfo = [
    { date: new Date('2018').toISOString(), temp: 200 },
    { date: new Date('2019').toISOString(), temp: 20 },
    { date: new Date('2020').toISOString(), temp: 80 },
  ];
  return snapshotsInfo.map(({ date, temp }) => generateSnapshot(stations, temp, date));
};
