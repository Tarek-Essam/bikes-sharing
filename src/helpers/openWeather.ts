import axios from 'axios';
import _ from 'lodash';
import config from '../config';

const { openWeatherKey, openWeatherUrl } = config;

export const fetchCurrentWeather = (cityName: string) => axios.get(
  openWeatherUrl,
  {
    params: {
      appid: openWeatherKey,
      q: cityName,
    },
  },
)
  .then((res) => res.data);
