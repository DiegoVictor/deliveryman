import { Router } from 'express';

import clients from './clients';
const app = Router();
app.use('/clients', clients);
export default app;
