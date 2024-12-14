import 'express-async-errors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { isBoom } from '@hapi/boom';

import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/v1', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (isBoom(err)) {
    const { statusCode, payload } = err.output;

    return response.status(statusCode).json({
      ...payload,
      ...err.data,
      docs: process.env.DOCS_URL,
    });
  }

  return response.status(500).json({
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log('Deliveryman is on air!');
});
