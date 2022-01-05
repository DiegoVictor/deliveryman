import { Router } from 'express';

import { AuthenticateDeliverymanController } from '../../../modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '../../../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';

const app = Router();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

app.post('/', usernameAndPasswordValidator, createDeliverymanController.handle);
app.post(
  '/auth',
  usernameAndPasswordValidator,
  authenticateDeliverymanController.handle
);

export default app;
