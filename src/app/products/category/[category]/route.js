import connectDB from "@/app/config/db";
import Product from "@/app/models/Products";

await connectDB();

export async function GET(request, { params }) {
  try {
    const products = await Product.find({
      "product_data.category": new RegExp(params.category, "i"),
      is_active: true,
    }).populate("product_sub_images");

    return Response.json({ products });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
