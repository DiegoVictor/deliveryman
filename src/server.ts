import 'express-async-errors';
import express from 'express';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use('/v1', routes);

app.listen(process.env.PORT, () => {
  console.log('Deliveryman is on air!');
});
