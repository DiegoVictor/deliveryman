import { Router } from 'express';

import { FindNotDeliveredController } from '../../../modules/deliveries/useCases/findNotDelivered/FindNotDeliveredController';
import { SetDeliveryDeliverymanController } from '../../../modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanController';
import { ensureDeliverymanAuthentication } from '../../infra/http/middlewares/ensureDeliverymanAuthentication';
import { SetAsDeliveredController } from '../../../modules/deliveries/useCases/setAsDelivered/SetAsDeliveredController';
import { idValidator } from '../../infra/http/validators/id';

const app = Router();

const findNotDeliveredController = new FindNotDeliveredController();
const setDeliveryDeliverymanController = new SetDeliveryDeliverymanController();
const setAsDeliveredController = new SetAsDeliveredController();

app.use(ensureDeliverymanAuthentication);

app.get('/not_delivered', findNotDeliveredController.handle);
app.patch(
  '/:id/set_deliveryman',
  idValidator,
  setDeliveryDeliverymanController.handle
);
app.patch(
  '/:id/set_as_delivered',
  idValidator,
  setAsDeliveredController.handle
);

export default app;
