import { Router } from 'express';

import { FindNotDeliveredController } from '../../../modules/deliveries/useCases/findNotDelivered/FindNotDeliveredController';
import { SetDeliveryDeliverymanController } from '../../../modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanController';

const app = Router();

const findNotDeliveredController = new FindNotDeliveredController();
const setDeliveryDeliverymanController = new SetDeliveryDeliverymanController();
app.use(ensureDeliverymanAuthentication);

app.get('/not_delivered', findNotDeliveredController.handle);
app.patch(
  '/:id/set_deliveryman',
  idValidator,
  setDeliveryDeliverymanController.handle
);

export default app;
