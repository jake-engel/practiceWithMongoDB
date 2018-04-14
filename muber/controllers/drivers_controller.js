const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'There' });
  },

  async index(req, res, next) {
    const { lng, lat } = req.query;
    const drivers = await Driver.find({
      'geometry.coordinates': {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: 200000 // This is in meters
        }
      }
    }).catch(next);
    res.send(drivers);
  },

  async create(req, res, next) {
    const driver = await Driver.create(req.body).catch(next);
    res.send(driver);
  },

  async edit(req, res, next) {
    const driverId = req.params.id;
    await Driver.findByIdAndUpdate(driverId, req.body).catch(next);
    const driver = await Driver.findById(driverId).catch(next);
    res.send(driver);
  },

  async delete(req, res, next) {
    const driverId = req.params.id;
    const driver = await Driver.findByIdAndRemove(driverId).catch(next);
    res.status(204).send(driver);
  }
};
