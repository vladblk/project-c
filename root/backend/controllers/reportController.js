const User = require('../models/userModel');
const Camp = require('../models/campModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const ExcelJS = require('exceljs');
const ProductReview = require('../models/productReviewModel');

// All users report
exports.allUsersReport = catchAsync(async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Define the column headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Role', key: 'role', width: 10 },
      { header: 'isAccountActive', key: 'isAccountActive', width: 10 },
      { header: 'isLoggedIn', key: 'isLoggedIn', width: 10 },
      // Add more columns as needed
    ];

    // Populate the rows with user data
    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        email: user.email,
        role: user.role,
        isAccountActive: user.isAccountActive,
        isLoggedIn: user.isLoggedIn,
      });
    });

    // Set the response headers for downloading the file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=users-report_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// All camps report
exports.allCampsReport = catchAsync(async (req, res, next) => {
  try {
    // Fetch all users from the database
    const camps = await Camp.find();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Camps');

    // Define the column headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Discount', key: 'discount', width: 10 },
      { header: 'Ratings Average', key: 'ratingsAverage', width: 10 },
      { header: 'Ratings Quantity', key: 'ratingsQuantity', width: 10 },
      { header: 'Max Group Size', key: 'maxGroupSize', width: 10 },
      { header: 'Difficulty', key: 'difficulty', width: 10 },
      { header: 'Summary', key: 'summary', width: 40 },
      { header: 'Description', key: 'description', width: 100 },
      { header: 'Created', key: 'createdAt', width: 10 },
      { header: 'Country', key: 'country', width: 10 },
      { header: 'Address', key: 'location', width: 10 },

      // Add more columns as needed
    ];

    // Populate the rows with user data
    camps.forEach((camp) => {
      worksheet.addRow({
        name: camp.name,
        price: camp.price,
        discount: camp.discount,
        ratingsAverage: camp.ratingsAverage,
        ratingsQuantity: camp.ratingsQuantity,
        duration: camp.duration,
        maxGroupSize: camp.maxGroupSize,
        difficulty: camp.difficulty,
        summary: camp.summary,
        description: camp.description,
        createdAt: camp.createdAt,
        country: camp.country,
        location: camp.location.address,
      });
    });

    // Set the response headers for downloading the file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=camps-report_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// All products report
exports.allProductsReport = catchAsync(async (req, res, next) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define the column headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Description', key: 'description', width: 60 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'CreatedAt', key: 'createdAt', width: 10 },
      // Add more columns as needed
    ];

    // Populate the rows with user data
    products.forEach((product) => {
      worksheet.addRow({
        name: product.name,
        price: product.email,
        description: product.description,
        quantity: product.quantity,
        createdAt: product.createdAt,
      });
    });

    // Set the response headers for downloading the file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=products-report_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// All reviews report
// All users report
exports.allReviewsReport = catchAsync(async (req, res, next) => {
  try {
    // Fetch all users from the database
    const campReviews = await Review.find();
    const productReviews = await ProductReview.find();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const campReviewsWorksheet = workbook.addWorksheet('Camps Reviews');
    const productReviewsWorksheet = workbook.addWorksheet('Products Reviews');

    // Define the column headers
    campReviewsWorksheet.columns = [
      { header: 'Review', key: 'review', width: 60 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Created', key: 'createdAt', width: 10 },
      { header: 'Camp', key: 'camp', width: 20 },
      { header: 'User', key: 'user', width: 20 },
      // Add more columns as needed
    ];

    productReviewsWorksheet.columns = [
      { header: 'Review', key: 'review', width: 60 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Created', key: 'createdAt', width: 10 },
      { header: 'Product', key: 'product', width: 20 },
      { header: 'User', key: 'user', width: 20 },
      // Add more columns as needed
    ];

    // Populate the rows with user data
    campReviews.forEach((review) => {
      campReviewsWorksheet.addRow({
        review: review.review,
        rating: review.rating,
        createdAt: review.createdAt,
        camp: review.camp.name,
        user: review.user.name,
      });
    });

    productReviews.forEach((review) => {
      productReviewsWorksheet.addRow({
        review: review.review,
        rating: review.rating,
        createdAt: review.createdAt,
        product: review.product.name,
        user: review.user.name,
      });
    });

    // Set the response headers for downloading the file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reviews-report_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
    );

    // Write the workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
