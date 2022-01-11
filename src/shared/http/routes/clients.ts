import { Router } from 'express';

import { AuthenticateClientController } from '../../../modules/accounts/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '../../../modules/clients/useCases/createClient/CreateClientController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';
import { ensureClientAuthentication } from '../middlewares/ensureClientAuthentication';
const app = Router();

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
export default app;
