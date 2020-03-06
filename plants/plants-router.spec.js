const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig');
const authenticate = require('../auth/authenticate-middleware.js');
jest.mock('../auth/authenticate-middleware.js');

beforeEach(async () => {
  await db('plants').truncate();
  await db.seed.run();
  authenticate.mockClear();
})

describe('plants', () => {
  // Get Test
  it('get /', async () => {
    authenticate.mockImplementationOnce((req, res, next) => {
      console.log("I ran this test");
      req.user = { id: 1 };
      next();
    });
    const res = await request(server)
          .get('/api/1/plants');
    expect(res.status).toBe(200);
    expect(authenticate).toBeCalled();
  });

  // Post Test
  it('Post', async () => {
    authenticate.mockImplementationOnce((req, res, next) => {
      console.log("I ran this test");
      req.user = { id: 1 };
      next();
    });
    const res = await request(server)
          .post('/api/1/plants/')
          .send({nickname: 'African Violet3', species: 'Saintpaulia', h2oFrequency: 4, image: 'https://www.houseplantsexpert.com/image-files/african-violet.jpg', user_id: 1 })
    expect(res.status).toBe(201);
    expect(authenticate).toBeCalled();
  });

  // Update Test
  it('Update', async () => {
    authenticate.mockImplementationOnce((req, res, next) => {
      console.log("I ran this test");
      req.user = { id: 1 };
      next();
    });
    const res = await request(server)
          .put('/api/1/plants/1')
          .send({ h2oFrequency: 2 })
    expect(res.status).toBe(200);
    expect(authenticate).toBeCalled();
  });

  // Delete Test
  it('Delete', async () => {
    authenticate.mockImplementationOnce((req, res, next) => {
      console.log("I ran this test");
      req.user = { id: 1 };
      next();
    });
    const res = await request(server)
          .delete('/api/1/plants/4')
    expect(res.status).toEqual(200);
    expect(authenticate).toBeCalled();
  });
});
