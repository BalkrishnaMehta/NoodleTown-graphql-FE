import CartItem from "./CartItem";

export default interface Order {
  id?: string;
  total: number;
  discount: number;
  netTotal: number;
  address: string;
  products: CartItem[];
  status?: string;
  createdAt?: string;
}
