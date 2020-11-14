# bikes-sharing

## start app using docker

Inject your open waether api secret in the development.yml docker-compose
```
bash run-dev.sh
```

## tests

```
MONGO_URL=<mongo url> TOKEN=<auth token> OPEN_WEATHER_KEY=<weather key> npm test
```

## swagger url

```
${domain}/api/v1/docs
```
check the deployed version [here](https://young-fjord-77292.herokuapp.com/api/v1/docs/)
