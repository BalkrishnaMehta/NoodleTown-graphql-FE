import Navbar from "../components/UI/Navbar";
import ImageGridGallery from "../components/UI/ImageGridGallery";
import DetailViewHero from "../components/BrandDetails/Hero";
import ProductCategories from "../components/BrandDetails/ProductCategories";

import { useParams } from "react-router-dom";
import MenuImage from "../components/BrandDetails/Menu";
import { useEffect } from "react";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_DETAILS } from "../apollo/graphql/queries/restaurantQueries";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";

interface RestaurantWithMenu extends Restaurant {
  categories: Category[];
}

const BrandDetailView = () => {
  const { brand: restaurantId } = useParams();

  const { loading, error, data } = useQuery<{
    getRestaurantById: RestaurantWithMenu;
  }>(GET_RESTAURANT_DETAILS, {
    variables: { id: restaurantId || "" },
  });

  const details: RestaurantWithMenu | null = data?.getRestaurantById || null;

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  return (
    <>
      <Navbar />
      {loading ? (
        <>
          <ImageGridGallery.Skeleton />
          <DetailViewHero.Skeleton />
        </>
      ) : details ? (
        <>
          <ImageGridGallery
            primaryImage={details.coverImages?.[0] || ""}
            secondaryImage={details.coverImages?.[1] || ""}
            ternaryImage={details.coverImages?.[2] || ""}
            gridItemHeight
            animateOnce
          />
          <DetailViewHero details={details} />
        </>
      ) : (
        <p className="error-message">Restaurant details not available.</p>
      )}

      <section className="p-2">
        <div className="detailpage-container">
          <h4 className="text-500">Menu</h4>
          <div className="my-2 row gap-2 sm-col">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>
                      <div className={"brand-image"}>
                        <Skeleton
                          className="brand-image"
                          height={300}
                          borderRadius={16}
                        />
                      </div>
                      <p>
                        <Skeleton width={120} height={16} />
                      </p>
                    </div>
                  ))
              : details?.menuImages?.map((image: string, index: number) => (
                  <MenuImage
                    key={index}
                    imageUrl={image}
                    title={`Menu-Image ${index + 1}`}
                  />
                )) || (
                  <p className="error-message">No menu images available.</p>
                )}
          </div>
        </div>
      </section>

      {loading ? (
        <ProductCategories.Skeleton />
      ) : details?.categories?.length ? (
        <ProductCategories menu={details.categories} />
      ) : (
        <p>No product categories available.</p>
      )}
    </>
  );
};

export default BrandDetailView;
