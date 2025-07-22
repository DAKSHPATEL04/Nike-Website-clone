export interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_sub_images: string[];  // Can be strings or ObjectIds
  product_data: {
    price: number;  // Changed from "prize" to "price" (correct spelling)
    description: string;  // Fixed typo from "descrption"
    rating: number;
    is_new: boolean;
    brand?: string;  // Optional field
    category?: string;  // Optional field
    model_number?: string;  // Optional field
    createdAt: string | Date;
    updatedAt: string | Date;
  };
  base_price: number;
  available_sizes?: string[];  // Optional array of sizes
  tags?: string[];  // Optional tags
  is_featured?: boolean;  // Optional
  is_active?: boolean;  // Optional
  variations?: ProductVariation[];  // Optional nested variations
  __v?: number;  // Version key from Mongoose (optional in frontend)
}

export interface ProductVariation {
  _id: string;
  color_name: string;
  color_code: string;
  variation_images: string[];
  main_image: string;
  stock_quantity: number;
  is_available: boolean;
  size_availability: {
    size: string;
    stock: number;
    price_adjustment?: number;
  }[];
  product_id: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}