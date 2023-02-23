const server = require('./index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
describe('User Endpoints', () => {

    it('GET /items should show all items', async () => {
      const res = await requestWithSupertest.get('/items');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('[]')
    });
  
  });