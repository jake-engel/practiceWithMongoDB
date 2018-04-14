const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection.once('open', () => done()).on('error', err => console.warning('Warning', error));
});

beforeEach(async () => {
  const { drivers } = mongoose.connection.collections;
  try {
    await drivers.drop(); // This line will delete our PointSchema for our Driver class
    drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }); // Needs this line to fix above issue
  } catch(exc) {}
});
