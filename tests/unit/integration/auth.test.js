const {Users} = require('../../../models/user');
const {Genere} = require('../../../models/genere');
const request = require('supertest');

describe('auth middleware', () => {
  beforeEach(() => { server = require('../../../example'); })
  afterEach(async () => { 
    await Genere.remove();
    await server.close(); 
  });

  let token; 

  const exec = () => {
    return request(server)
      .post('/api/generes')
      .set('X-auth-token', token)
      .send({ gener: 'genre1' });
  }

  beforeEach(() => {
    token = new Users().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = ''; 

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; 

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});