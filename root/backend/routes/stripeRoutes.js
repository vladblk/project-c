const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res, next) => {
  const event = req.body;

  console.log(event);

  try {
    if (event.type === 'checkout.session.completed') {
      const sessionId = event.data.object.id;
      console.log(sessionId);

      const items = await stripe.checkout.sessions.listLineItems(sessionId);

      console.log('Items:', JSON.stringify(items, null, 2));

      // Update the stock quantity for each purchased item
      for (const item of items.data) {
        const itemName = item.description;
        const purchasedQuantity = item.quantity;

        // Retrieve the item from your database or data store
        const product = await Product.findOne({ name: itemName });

        // Update the stock quantity by subtracting the purchased quantity
        product.stock -= purchasedQuantity;

        // Save the updated item back to the database or data store
        await product.save();
      }
    }

    // Send a response to Stripe to acknowledge the webhook event
    res.json({ received: true });
  } catch (err) {
    console.log('Webhook error:', err);
    next(err);
  }
};

router.post('/webhook', stripeWebhook);

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   'whsec_a0068933cc0d383b45ca5ee8f67e415ef5e14f920a29807560b4002c3242730b';

// router.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         console.log(paymentIntentSucceeded);
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

module.exports = router;
