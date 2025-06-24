export interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_data: {
    prize: number;
    descrption: string;
    rating: number;
    is_new: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
