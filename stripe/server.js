require('dotenv').config();
const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4242;
const stripe = Stripe("sk_test_51PXMcnRrepp26VqMXuGQkdCb1L49PSRBIrcblgznCdzfBcwwgUWLsY4MILsaohyg5pq6kiIEEQodm0pXaFtMlmGL006WbqcYUy");

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;
    console.log('Received request to create payment intent:', req.body); // Log request body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ["card"],
        });
        console.log('Payment intent created:', paymentIntent.id); // Log payment intent ID
        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error("Error creating payment intent:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
