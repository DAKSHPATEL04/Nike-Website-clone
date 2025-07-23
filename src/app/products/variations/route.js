import connectDB from "@/app/config/db";
import Product from "@/app/models/Products";
import ProductVariation from "@/app/models/ProductVariation";

await connectDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const color = searchParams.get("color");
    const productId = searchParams.get("productId");

    if (color) {
      const variations = await ProductVariation.find({
        color_name: new RegExp(color, "i"),
        is_available: true,
      }).populate("product_id");
      return Response.json({ variations });
    }

    if (productId) {
      const variations = await ProductVariation.find({ product_id: productId });
      return Response.json({ variations });
    }

    return Response.json(
      { message: "Specify color or productId parameter" },
      { status: 400 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { productId, ...variationData } = await request.json();
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const newVariation = new ProductVariation({
      ...variationData,
      product_id: productId,
    });

    const savedVariation = await newVariation.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { product_sub_images: savedVariation._id },
    });

    return Response.json(savedVariation, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
