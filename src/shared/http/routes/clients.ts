import { Router } from 'express';

import { AuthenticateClientController } from '../../../modules/accounts/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '../../../modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from '../../../modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';
import { FindClientDeliveriesController } from '../../../modules/clients/useCases/findClientDeliveries/FindClientDeliveriesController';
import { ensureClientAuthentication } from '../middlewares/ensureClientAuthentication';
import { productNameValidator } from '../validators/productName';

const app = Router();

const createDeliveryController = new CreateDeliveryController();
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const findClientDeliveriesController = new FindClientDeliveriesController();

app.post('/', usernameAndPasswordValidator, createClientController.handle);
app.post(
  '/auth',
  usernameAndPasswordValidator,
  authenticateClientController.handle
);

app.use(ensureClientAuthentication);

app.get('/deliveries', findClientDeliveriesController.handle);
app.post('/deliveries', productNameValidator, createDeliveryController.handle);

export default app;
