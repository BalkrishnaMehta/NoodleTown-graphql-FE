import Product from "./Product";

export default interface Category {
  id: string;
  name: string;
  products: Product[];
}
