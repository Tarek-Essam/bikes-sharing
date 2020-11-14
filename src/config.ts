const definedEnvs = Object.keys(process.env);

const getEnv = (envName: string, required: boolean = true) => {
  if (required && !definedEnvs.includes(envName)) throw new Error(`${envName} missing`);
  return process.env[envName];
};

export default {
  port: getEnv('PORT', false) || 3000,
  token: getEnv('TOKEN'),
  mongoUrl: getEnv('MONGO_URL'),
  indegoUrl: getEnv('INDEGO_URL', false) || 'https://kiosks.bicycletransit.workers.dev/phl',
  openWeatherUrl: getEnv('OPEN_WEATHER_URL', false) || 'https://api.openweathermap.org/data/2.5/weather',
  openWeatherKey: getEnv('OPEN_WEATHER_KEY'),
};
