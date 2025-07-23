import connectDB from "@/app/config/db";
import Product from "@/app/models/Products";
import ProductVariation from "@/app/models/ProductVariation";

await connectDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if filtered products requested
    if (searchParams.toString()) {
      return getFilteredProducts(request);
    }

    const products = await Product.find()
      .populate("product_sub_images")
      .sort({ createdAt: -1 });

    return Response.json({ products });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { variations, ...productData } = await request.json();

    if (variations?.length > 0) {
      const variationIds = [];
      for (const variation of variations) {
        const newVariation = new ProductVariation(variation);
        const savedVariation = await newVariation.save();
        variationIds.push(savedVariation._id);
      }
      productData.product_sub_images = variationIds;
    }

    const newProduct = new Product(productData);
    const saved = await newProduct.save();

    if (productData.product_sub_images?.length > 0) {
      await ProductVariation.updateMany(
        { _id: { $in: productData.product_sub_images } },
        { product_id: saved._id }
      );
    }

    const populatedProduct = await Product.findById(saved._id).populate(
      "product_sub_images"
    );

    return Response.json(populatedProduct, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

async function getFilteredProducts(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const filters = { is_active: true };

    if (category) filters["product_data.category"] = new RegExp(category, "i");
    if (brand) filters["product_data.brand"] = new RegExp(brand, "i");
    if (minPrice || maxPrice) {
      filters["product_data.price"] = {};
      if (minPrice) filters["product_data.price"].$gte = Number(minPrice);
      if (maxPrice) filters["product_data.price"].$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const sortOption = {};
    sortOption[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find(filters)
      .populate("product_sub_images")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filters);

    return Response.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        limit: Number(limit),
      },
    });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
