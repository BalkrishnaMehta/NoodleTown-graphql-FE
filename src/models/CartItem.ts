import Product from "./Product";

export default interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
}
