import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderToPaid } from "@/lib/actions/order.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  //   Check for successful payment
  if (event.type === "payment_intent.succeeded") {
    const { object } = event.data;

    // Update order status
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: "COMPLETED",
        email_address: object.receipt_email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });
    return NextResponse.json({
      message: "updateOrderToPaid was successful",
    });
  }

  return NextResponse.json({
    message: "event is not payment_intent.succeeded",
  });
}
