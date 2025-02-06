export default interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seasonalTag?: string;
  isVeg: boolean;
}
