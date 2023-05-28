const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require('../utils/catchAsync');

exports.checkout = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.count,
      };
    }),
    success_url: 'http://localhost:3001/success',
    cancel_url: 'http://localhost:3001/cancel',
  });

  res.json({ url: session.url });
});
