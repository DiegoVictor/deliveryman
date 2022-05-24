import { badRequest, unauthorized } from '@hapi/boom';
import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from '@faker-js/faker';
import { sign } from 'jsonwebtoken';

import { ensureDeliverymanAuthentication } from '../../../src/shared/infra/http/middlewares/ensureDeliverymanAuthentication';

describe('ensureDeliverymanAuthentication', () => {
  it('should be able to authenticate', async () => {
    const id = faker.datatype.uuid();
    const token = sign({}, String(process.env.JWT_DELIVERYMAN_SECRET), {
      subject: id,
    });
    const request = getMockReq({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { res: response, next } = getMockRes();

    await ensureDeliverymanAuthentication(request, response, next);

    expect(next).toHaveBeenCalled();
    expect(request).toHaveProperty('deliveryman_id', id);
  });

  it('should not be able to authenticate without send auth token', async () => {
    const request = getMockReq();
    const { res: response, next } = getMockRes();

    await expect(() =>
      ensureDeliverymanAuthentication(request, response, next)
    ).rejects.toEqual(
      badRequest('Missing authentication token', { code: 440 })
    );
    expect(next).not.toHaveBeenCalled();
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

    await expect(() =>
      ensureDeliverymanAuthentication(request, response, next)
    ).rejects.toEqual(
      unauthorized('Invalid authentication token', 'sample', { code: 441 })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
