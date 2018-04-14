const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
  it('POST to /api/drivers creates a new driver', async () => {
    const initCount = await Driver.count();
    const response = await request(app).post('/api/drivers').send({ email: 'test@test.com' });
    const newCount = await Driver.count();
    assert(initCount + 1 === newCount);
  });

  it('PUT to /api/drivers/:id edits an existing driver', async () => {
    const newDriver = await new Driver({ email: 'newdriver@gmail.com', driving: false });
    await newDriver.save();
    await request(app).put(`/api/drivers/${newDriver._id}`).send({ driving: true });
    const driver = await Driver.findOne({ email: 'newdriver@gmail.com' });
    assert(driver.driving);
  });

  it('DELETE to /api/drivers/:id deletes an existing driver', async () => {
    const newDriver = await new Driver({ email: 'test@test.com' });
    await newDriver.save();
    await request(app).delete(`/api/drivers/${newDriver._id}`);
    const driver = await Driver.findOne({ email: 'test@test.com' });
    assert(!driver);
  });

  it('GET to /api/drivers finds nearby drivers', async () => {
    const seatleDriver = new Driver({ email: 'seatle@gmail.com', geometry: {
      type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({ email: 'miami@gmail.com', geometry: {
      type: 'Point', coordinates: [-80.253, 25.791] }
    });
    await Promise.all([seatleDriver.save(), miamiDriver.save()]);
    const response = await request(app).get('/api/drivers?lng=-80&lat=25');
    assert(response.body.length === 1);
    assert(response.body[0].email === 'miami@gmail.com');
  });
});
