import { fetchAvailableBikes } from '../helpers/indego';
import { fetchCurrentWeather } from '../helpers/openWeather';
import { Snapshot } from '../models';
import CustomError from '../helpers/customError';

export const createStationsSnapshot = async () => {
  const [stations, weather] = await Promise.all([
    fetchAvailableBikes(),
    fetchCurrentWeather('Philadelphia'),
  ]);
  return Snapshot.create({ stations, weather });
};

/**
 * @param  {string} snapshotTime
 */
export const getSnapshot = async (snapshotTime: string) => {
  const snapshot = await Snapshot.findOne(
    { at: { $gte: new Date(snapshotTime) } },
    { _id: 0, updatedAt: 0, __v: 0 },
  );
  if (!snapshot) throw new CustomError({ statusCode: 404, code: 'NOT_FOUND', message: 'no snapshot found' });
  return snapshot;
};

/**
 * @param  {string} snapshotTime
 * @param  {number} kioskId
 */
export const getSingleStation = async (snapshotTime: string, kioskId: number) => {
  const snapshot = await Snapshot.findOne(
    { at: { $gte: new Date(snapshotTime) } },
    {
      stations: { $elemMatch: { 'properties.kioskId': kioskId } }, weather: 1, at: 1, _id: 0,
    },
  );
  if (!snapshot) throw new CustomError({ statusCode: 404, code: 'NOT_FOUND', message: 'no snapshot found' });
  if (!snapshot.stations.length) throw new CustomError({ statusCode: 404, code: 'NOT_FOUND', message: `no staion found with the id ${kioskId}` });
  return {
    station: snapshot.stations[0],
    at: snapshot.at,
    weather: snapshot.weather,
  };
};
