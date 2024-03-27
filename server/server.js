// This is your test secret API key.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(express.static('public'));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CLIENT_URL = 'http://localhost:4242';

const stripe = require('stripe')(process.env.API_KEY);

app.post('/checkout', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map((item) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${CLIENT_URL}/success.html`,
        cancel_url: `${CLIENT_URL}/cancel.html`,
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
    console.log('apikey', process.env.API_KEY)
  }
});

app.listen(4242, () => console.log('Running on port 4242'));