"use server";
import { getDB } from "../../db/prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

const db = getDB();

// Get latest products
export async function getLatestProduct() {
  //   get first 4 products
  const data = await db.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { created: "desc" },
  });

  return convertToPlainObject(data);
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await db.product.findFirst({ where: { slug: slug } });
}
