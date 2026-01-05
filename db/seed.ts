import { getDB } from "./prisma";
import sampleData from "./sample-data";

async function main() {
  const db = getDB();
  await db.product.deleteMany();

  await db.product.createMany({
    data: sampleData.products,
  });

  console.log("Database seeded successfully");
}

main();
