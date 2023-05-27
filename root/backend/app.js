const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utils/appError');
const campRouter = require('./routes/campRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const productRouter = require('./routes/productRoutes');
const checkoutRouter = require('./routes/checkoutRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));

// security headers middleware
app.use(helmet());

// limit the api calls
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests registered. Please try again later!',
});

// Apply the rate limiting middleware to all requests
app.use('/api', apiLimiter);

// parse data from body into req.body middleware
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// data sanitization against query injections
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

// prevent paramter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
      'country',
    ],
  })
);

// testing middleware
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Credentials', 'true');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  // );

  console.log('req.cookies: ', req.cookies);
  console.log('req.headers: ', req.headers);
  console.log('res.locals: ', res.locals);

  next();
});

// mount the camp router as a middleware
app.use('/api/v1/camps', campRouter);

// mount the user router as a middleware
app.use('/api/v1/users', userRouter);

// mount the review router as a middleware
app.use('/api/v1/reviews', reviewRouter);

// mount the product router as a middleware
app.use('/api/v1/products', productRouter);

app.use('/api/v1/checkout', checkoutRouter);

// handle unhandled routes
app.all('*', (req, res, next) => {
  const errorMessage = `Could not find ${req.originalUrl} route on this server!`;
  const errorStatusCode = 404;
  const error = new AppError(errorMessage, errorStatusCode);

  next(error);
});

// error handler middleware
app.use(globalErrorHandler);

module.exports = app;
