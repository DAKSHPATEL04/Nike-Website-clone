import connectDB from "@/app/config/db";
import Product from "@/app/models/Products";

await connectDB();

export async function GET() {
  try {
    const products = await Product.find({
      is_featured: true,
      is_active: true,
    })
      .populate("product_sub_images")
      .sort({ createdAt: -1 });

    return Response.json({ products });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
