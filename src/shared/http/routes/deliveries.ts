import { Router } from 'express';

import { FindNotDeliveredController } from '../../../modules/deliveries/useCases/findNotDelivered/FindNotDeliveredController';
import { ensureDeliverymanAuthentication } from '../middlewares/ensureDeliverymanAuthentication';

const app = Router();

const findNotDeliveredController = new FindNotDeliveredController();
app.use(ensureDeliverymanAuthentication);

app.get('/not_delivered', findNotDeliveredController.handle);

export default app;
