const assert = require('assert');
const request = require('supertest');

const app = require('../app');

describe('Express app', () => {
  it('handles GET request to /api', async () => {
    const response = await request(app).get('/api');
    assert(response.body.hi === 'There');
  });
});
