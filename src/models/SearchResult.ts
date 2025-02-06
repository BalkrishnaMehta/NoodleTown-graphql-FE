import Categories from "./Category";
import Product from "./Product";
import Restaurant from "./Restaurant";

export default interface SearchResult {
  item: Product | Categories | Restaurant;
  type: string;
}
