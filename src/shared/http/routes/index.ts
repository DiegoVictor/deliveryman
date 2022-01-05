import { Router } from 'express';

import clients from './clients';
import deliveryman from './deliveryman';
const app = Router();

app.use('/clients', clients);
app.use('/deliveryman', deliveryman);
export default app;
