import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: NextRequest) {
  const { amount = 2000, currency = 'usd' } = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // $20.00 in cents
    currency,
    // add optional metadata or receipt_email if you want
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}

