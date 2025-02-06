import Card from "../UI/cards/Card";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import errorToasting from "../../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { GET_SEASONAL_PRODUCTS } from "../../apollo/graphql/queries/productQueries";
import { useQuery } from "@apollo/client";

export default function SeasonalProducts() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{
    getSeasonalProducts: Product[];
  }>(GET_SEASONAL_PRODUCTS);

  const products: Product[] = data?.getSeasonalProducts || [];

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  return (
    <section>
      <div className="category-container p-2">
        <h2 className="category-heading">Food according to weather</h2>
        <div className="my-2 grid gap-2">
          {loading
            ? Array(6)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="col gap-half">
                    <Skeleton height={240} borderRadius={16} />
                    <div>
                      <Skeleton width={200} height={20} />
                      <Skeleton width={130} height={20} />
                    </div>
                  </div>
                ))
            : products.length !== 0 &&
              products.map((food: Product, index: number) => {
                return (
                  <Card
                    onClick={() => {
                      navigate(`../products/${food.id}`);
                    }}
                    primaryText={food.title}
                    primaryFontBold
                    secondaryText={food.seasonalTag || ""}
                    image={food.imageUrl}
                    imgHeightClass={"img_height2"}
                    borderRadius={"all"}
                    key={`food${index}`}
                    animate
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
}
