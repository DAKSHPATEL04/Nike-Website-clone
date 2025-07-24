import mongoose from "mongoose";

const productVariationSchema = new mongoose.Schema(
  {
    color_name: {
      type: String,
      required: true,
    },
    color_code: {
      type: String,
      required: true,
    },
    variation_images: [
      {
        type: String,
        required: true,
      },
    ],
    main_image: {
      type: String,
      required: true,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    size_availability: [
      {
        size: String,
        stock: Number,
        price_adjustment: {
          type: Number,
          default: 0,
        },
      },
    ],
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  {
    collection: "product_variations",
    timestamps: true,
  }
);

productVariationSchema.index({ product_id: 1, color_name: 1 });
productVariationSchema.index({ is_available: 1 });

export default mongoose.models.ProductVariation ||
  mongoose.model("ProductVariation", productVariationSchema);
