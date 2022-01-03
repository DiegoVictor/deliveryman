import { Router } from 'express';

const app = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

app.post('/', createClientController.handle);
app.post('/auth', authenticateClientController.handle);
export default app;
