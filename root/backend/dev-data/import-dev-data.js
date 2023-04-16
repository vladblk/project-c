require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Destination = require('../models/destinationModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Database connected!'));

const destinations = JSON.parse(fs.readFileSync('./dev-data.json'));

const importData = async () => {
  try {
    await Destination.create(destinations);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Destination.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}

// mongoose.disconnect(DB).then(() => console.log('Database disconnected!'));
