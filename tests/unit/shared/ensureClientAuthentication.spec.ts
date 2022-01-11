import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';
import { sign } from 'jsonwebtoken';

import { ensureClientAuthentication } from '../../../src/shared/http/middlewares/ensureClientAuthentication';

describe('ensureClientAuthentication', () => {
  it('should be able to authenticate', async () => {
    const id = faker.datatype.uuid();
    const token = sign({}, String(process.env.JWT_CLIENT_SECRET), {
      subject: id,
    });
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { res: response, next } = getMockRes();

    await ensureClientAuthentication(request, response, next);

    expect(next).toHaveBeenCalled();
    expect(request).toHaveProperty('client_id', id);
  });

  it('should not be able to authenticate without send auth token', async () => {
    const request = getMockReq();
    const { res: response, next } = getMockRes();

    await ensureClientAuthentication(request, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Missing authentication token',
    });
  });

  it('should not be able to authenticate with invalid token', async () => {
    const id = faker.datatype.uuid();
    const token = sign({}, 'invalid-secret', {
      subject: id,
    });
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { res: response, next } = getMockRes();

    await ensureClientAuthentication(request, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Invalid authentication token',
    });
  });
});
