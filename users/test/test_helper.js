const mongoose = require('mongoose');
// import mongoose from 'mongoose';

// before is only executed one time for all of your test suite
before((done) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection.once('open', () => {
    done();
  }).on('error', (error) => {
    console.warn('Warning', error);
  });
});

const dropCollection = collectionName =>
  mongoose.connection.collections[collectionName].drop()
    .catch(err => err.message === 'ns not found' ? Promise.resolve() : Promise.reject(err))

beforeEach(() => Promise.all([
  dropCollection('users'),
  dropCollection('comments'),
  dropCollection('blogposts'),
]))

// HEADS UP. You can do it.only('',() => {}}) in order to ONLY execute that one test
