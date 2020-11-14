import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import {
  notFound, error, authentication, swaggerDynamicLoading,
} from './middleware';
import routes from './routes';

import swaggerDocument from './swagger.json';

const { port, mongoUrl } = config;

mongoose.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (err) => {
  if (!err) console.info(`successfully connected to database\n ${mongoUrl}`);
  else {
    console.error(err);
    process.exit(1);
  }
});

const server: express.Application = express();

server.use(helmet());
server.use('/api/docs', swaggerDynamicLoading, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(authentication);
server.use('/api/v1', routes);
server.use('*', notFound);
server.use(error);

if (require.main === module) {
  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}

export default server;
