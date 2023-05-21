require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const Camp = require('../models/campModel');
const Product = require('../models/productModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Database connected!'));

// const camps = JSON.parse(fs.readFileSync('./camps-dev-data.json'));
const products = JSON.parse(fs.readFileSync('./products-dev-data.json'));

const importData = async () => {
  try {
    // await Camp.create(camps);
    await Product.create(products);
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    // await Camp.deleteMany();
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}

// to import data execute: node import-dev-data --import
// to delete data execute: node import-dev-data --delete
