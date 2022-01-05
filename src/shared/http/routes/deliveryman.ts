import { Router } from 'express';

import { CreateDeliverymanController } from '../../../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { usernameAndPasswordValidator } from '../validators/usernameAndPassword';
const app = Router();

const createDeliverymanController = new CreateDeliverymanController();
app.post('/', usernameAndPasswordValidator, createDeliverymanController.handle);
export default app;
