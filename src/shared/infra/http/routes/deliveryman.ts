import { Router } from 'express';

import { AuthenticateDeliverymanController } from '../../../../modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '../../../../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';
import { ensureDeliverymanAuthentication } from '../middlewares/ensureDeliverymanAuthentication';
import { FindDeliverymanDeliveriesController } from '../../../../modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesController';

const app = Router();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const findDeliverymanDeliveriesController =
  new FindDeliverymanDeliveriesController();

app.post('/', usernameAndPasswordValidator, createDeliverymanController.handle);
app.post(
  '/auth',
  usernameAndPasswordValidator,
  authenticateDeliverymanController.handle
);

app.use(ensureDeliverymanAuthentication);

app.get('/deliveries', findDeliverymanDeliveriesController.handle);

export default app;
