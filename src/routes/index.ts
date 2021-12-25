import { Router } from 'express';

import { AuthenticateClientController } from "../modules/accounts/authenticateUser/AuthenticateClientController";
import { CreateClientController } from "../modules/clients/useCases/createClient/CreateClientController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post('/clients', createClientController.handle);
routes.post('/clients/auth', authenticateClientController.handle);

export { routes };
