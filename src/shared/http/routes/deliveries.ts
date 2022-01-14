import { Router } from 'express';

import { ensureDeliverymanAuthentication } from '../middlewares/ensureDeliverymanAuthentication';

const app = Router();

app.use(ensureDeliverymanAuthentication);
export default app;
