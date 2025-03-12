import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSearchParam = searchParams.get("page");
  const page = pageSearchParam != null ? parseInt(pageSearchParam) : 0;

  return Response.json({
    products: Array.from({ length: 100 }, createProduct),
    page,
  });
}

function createProduct() {
  const id = uuidv4();
  const price = Math.floor(Math.random() * 10_000);

  return {
    id,
    name: `Product ${id}`,
    price,
    discountPrice: Math.floor(price * Math.random()),
    description: `This is a description for product ${id}`,
    image: `https://picsum.photos/100/100?random=${id}`,
  };
}
