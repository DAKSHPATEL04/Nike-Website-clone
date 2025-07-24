import connectDB from "@/app/config/db";
import Product from "@/app/models/Products";
import ProductVariation from "@/app/models/ProductVariation";

await connectDB();

export async function GET(request, { params }) {
  try {
    const product = await Product.findById(params.id).populate(
      "product_sub_images"
    );

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { variations, ...incomingData } = await request.json();
    const existing = await Product.findById(params.id);

    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (variations) {
      if (existing.product_sub_images?.length > 0) {
        await ProductVariation.deleteMany({
          _id: { $in: existing.product_sub_images },
        });
      }

      const variationIds = [];
      for (const variation of variations) {
        const newVariation = new ProductVariation({
          ...variation,
          product_id: params.id,
        });
        const savedVariation = await newVariation.save();
        variationIds.push(savedVariation._id);
      }
      incomingData.product_sub_images = variationIds;
    }

    const mergedData = {
      ...existing.toObject(),
      ...incomingData,
      product_data: {
        ...existing.product_data,
        ...incomingData.product_data,
      },
    };

    const updated = await Product.findByIdAndUpdate(params.id, mergedData, {
      new: true,
    }).populate("product_sub_images");

    return Response.json(updated);
  } catch (err) {
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.product_sub_images?.length > 0) {
      await ProductVariation.deleteMany({
        _id: { $in: product.product_sub_images },
      });
    }

    await Product.findByIdAndDelete(params.id);
    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
