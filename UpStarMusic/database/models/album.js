// Todo: create Album Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter the name of the album!']
  },
  date: Date,
  copiesSold: Number,
  numbeTracks: Number,
  image: String,
  revenue: Number
});

module.exports = AlbumSchema;
