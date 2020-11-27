import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import express, { Request, Response } from "express";
import cors from "cors";

import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Ho3r8JvugdMxF8pWXD5cchwZh681CFyvvQjFHCM8B0luMwO6eFLWw4UsGNpCHjmGPiVKc21TxjeRlPfvaP1hN8H00xBhILiqS",
  {
    apiVersion: "2020-08-27",
  }
);
//("sk_test_51Ho3r8JvugdMxF8pWXD5cchwZh681CFyvvQjFHCM8B0luMwO6eFLWw4UsGNpCHjmGPiVKc21TxjeRlPfvaP1hN8H00xBhILiqS")

//import { useStripe } from "@stripe/react-stripe-js";
//const stripe = useStripe();

//API

// App config
const app = express();

//Middlewares
app.use(cors({ origin: true })); //security
app.use(express.json());

//API routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello worlds");
});

app.get("/mongos", (req: Request, res: Response) => {
  console.log("Mongo is in the house ");
  res.status(200).send("mongo");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const amount = parseInt(`${total}`, 10);
  console.log("Payment Request recieved BOOM!!! for this amount: ", amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount, //subunits of the currecny
    currency: "usd",
  });
  // OK created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
  // res.status(200).send(`payment amount is:  ${amount}`)
});

//Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/challange-2befc/us-central1/api
