import { Prisma, PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({
  adapter: adapter,
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  },
}).$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        needs: { rating: true },
        compute(product) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true }, // confirm itemsPrice exist
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true }, // confirm itemsPrice exist
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true }, // confirm itemsPrice exist
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true }, // confirm itemsPrice exist
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true }, // confirm itemsPrice exist
        compute(order) {
          return order.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true }, // confirm itemsPrice exist
        compute(order) {
          return order.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true }, // confirm itemsPrice exist
        compute(order) {
          return order.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true }, // confirm itemsPrice exist
        compute(order) {
          return order.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem) {
          return orderItem.price.toString();
        },
      },
    },
  },
});
