import { promises as fs } from "fs";
import path from "path";

const PRICES_FILE = path.join(process.cwd(), "data", "prices.json");

export async function GET() {
  let previousPrices = [];

  try {
    await fs.mkdir(path.dirname(PRICES_FILE), { recursive: true });
    const fileData = await fs.readFile(PRICES_FILE, "utf-8");
    previousPrices = JSON.parse(fileData);
  } catch (error) {
    console.log("No previous prices found or error reading file:", error);
  }

  const result = Array.from({ length: 1_000 }, (_, index) => {
    const prevPrice = previousPrices[index]?.price || null;
    let price;
    let change: "UP" | "DOWN" | "STABLE" = "STABLE";

    // About half of the items should keep the same price
    if (prevPrice != null && Math.random() > 0.5) {
      price = prevPrice;
      change = "STABLE";
    } else {
      price = Math.floor(Math.random() * 1_000);

      if (prevPrice != null) {
        change =
          price > prevPrice ? "UP" : price < prevPrice ? "DOWN" : "STABLE";
      }
    }

    return {
      id: index,
      price,
      change,
    };
  });

  try {
    await fs.writeFile(PRICES_FILE, JSON.stringify(result));
  } catch (error) {
    console.error("Error saving prices to file:", error);
  }

  return Response.json(result);
}
