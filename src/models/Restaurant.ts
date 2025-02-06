export default interface Restaurant {
  id: string;
  title: string;
  logo: string;
  coverImages: string[];
  menuImages: string[];
  tags: string[];
  address: string;
  shopTiming: (number[] | null)[];
  averageOrderValue: number;
  typicalGroupSize: number;
}
