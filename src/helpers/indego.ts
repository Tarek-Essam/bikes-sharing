import axios from 'axios';
import _ from 'lodash';
import config from '../config';

const { indegoUrl } = config;

export const fetchAvailableBikes = () => axios.get(indegoUrl)
  .then((res) => _.get(res, 'data.features', []));
