import { Router } from 'express';

import clients from './clients';
import deliveryman from './deliveryman';
import deliveries from './deliveries';

const app = Router();

app.use('/clients', clients);
app.use('/deliveryman', deliveryman);
app.use('/deliveries', deliveries);

export default app;
