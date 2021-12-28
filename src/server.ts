import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use('/v1', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log('Deliveryman is on air!');
});
