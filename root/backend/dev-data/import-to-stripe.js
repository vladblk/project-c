require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Camp = require('../models/campModel');
const Product = require('../models/productModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Database connected!'));

// import to stripe
// Fetch items from your database
const fetchItemsFromDatabase = async () => {
  try {
    const camps = await Camp.find();
    const products = await Product.find();

    return [...camps, ...products];
  } catch (error) {
    console.error('Failed to fetch items from the database:', error);
    throw error;
  }
};

const createProductsInStripe = async (items) => {
  try {
    const products = [];
    for (const item of items) {
      const product = await stripe.products.create({
        name: item.name,
        description: item.description,
        price: item.price,
        // Set other properties as per your requirements
      });
      products.push(product);
    }
    return products;
  } catch (error) {
    console.error('Failed to create products in Stripe:', error);
    throw error;
  }
};

// Create prices for the products
const createPricesInStripe = async (products) => {
  try {
    const prices = [];
    for (const product of products) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: product.price * 100, // Convert price to the smallest currency unit (e.g., cents)
        currency: 'eur', // Set the currency as per your requirements
      });
      prices.push(price);
    }
    return prices;
  } catch (error) {
    console.error('Failed to create prices in Stripe:', error);
    throw error;
  }
};

// Main function to import items into Stripe
const importItemsIntoStripe = async () => {
  try {
    // Step 1: Fetch items from the database
    const items = await fetchItemsFromDatabase();

    // Step 2: Create products in Stripe
    const products = await createProductsInStripe(items);

    // Step 3: Create prices for the products
    const prices = await createPricesInStripe(products);

    console.log('Items imported into Stripe successfully!');
  } catch (error) {
    console.error('Failed to import items into Stripe:', error);
  }
};

// Run the import script
importItemsIntoStripe();
