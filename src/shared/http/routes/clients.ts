import { Router } from 'express';

import { AuthenticateClientController } from '../../../modules/accounts/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '../../../modules/clients/useCases/createClient/CreateClientController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';
const app = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

app.post('/', usernameAndPasswordValidator, createClientController.handle);
app.post(
  '/auth',
  usernameAndPasswordValidator,
  authenticateClientController.handle
);


export default app;
