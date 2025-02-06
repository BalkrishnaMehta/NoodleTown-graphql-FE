import { useParams } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import ProductCartActions from "../components/BrandDetails/ProductCartActions";

import styles from "../styles/BrandDetails/ProductDetail.module.css";
import Image from "../components/UI/Image";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import Product from "../models/Product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_DETAILS } from "../apollo/graphql/queries/productQueries";

const ProductDetail = () => {
  const { product } = useParams();
  const productId = product!;

  const { loading, error, data } = useQuery<{
    getProductById: Product;
  }>(GET_PRODUCT_DETAILS, {
    variables: { id: productId || "" },
  });

  const productData: Product | null = data?.getProductById || null;

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className={styles.productCard}>
          <div className={styles.imageContainer}>
            <Skeleton className={styles.productImage} />
            <Skeleton height={40} width={150} borderRadius={8} />
          </div>

          <div className={styles.contentContainer}>
            <Skeleton height={40} width="50%" borderRadius={8} />

            <div className={styles.priceContainer}>
              <Skeleton height={24} width={50} />
              <Skeleton height={24} width={100} />
            </div>

            <div className={`col gap-1 ${styles.description}`}>
              <Skeleton height={16} borderRadius={8} />
              <Skeleton count={8} height={16} borderRadius={8} />
              <Skeleton count={8} height={16} borderRadius={8} />
            </div>
          </div>
        </div>
      ) : (
        productData &&
        (productData !== null ? (
          <div className="category-container">
            <div className={styles.productCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={productData.imageUrl || ""}
                  alt={productData.title}
                  classes={styles.productImage}
                />
                <ProductCartActions product={productData} />
              </div>
              <div className={styles.contentContainer}>
                <h1 className={styles.title}>{productData.title}</h1>
                <div className={styles.priceContainer}>
                  <span className={styles.priceLabel}>Price:</span>
                  <span className={styles.price}>₹{productData.price}</span>
                </div>
                <div className={`col gap-1 ${styles.description}`}>
                  <p>{productData.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus accusamus odio sed reiciendis velit aspernatur
                    quibusdam itaque atque fugit sint, molestias est, minima
                    nisi ipsam enim sapiente laborum labore nesciunt iure?
                    Voluptatem, doloribus dicta itaque tempora porro vel
                    suscipit dolorum accusamus reprehenderit accusantium tenetur
                    dolorem, ea perferendis? Dolor maiores, autem odio voluptas
                    ab nulla commodi maxime quas assumenda alias rerum tenetur
                    beatae quaerat possimus sunt placeat ducimus magnam
                    aspernatur asperiores sint! Nobis, quo voluptatum ullam
                    officiis, enim dolorum minus omnis eveniet nisi, quasi quam
                    incidunt iure magnam. Autem ipsum sunt, sapiente ipsa
                    placeat nemo ratione aliquam in optio! Aliquid, voluptas?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores possimus quos, dolorem, pariatur unde sint ex
                    incidunt vero fugiat exercitationem magnam inventore neque
                    officia esse qui maiores sunt? Aperiam reprehenderit aliquam
                    laborum amet, impedit totam numquam odio non unde
                    consequatur omnis veniam, debitis, corrupti harum enim!
                    Consequuntur exercitationem facere veritatis a saepe fugiat
                    sit, et dolor. Deserunt dolor praesentium laboriosam labore
                    quisquam sed voluptatibus earum officiis sequi eum aliquam
                    ducimus distinctio natus quas architecto perferendis, quidem
                    dolorum odit porro ab error, eveniet ipsa quasi dolorem.
                    Debitis, rem nam quas, consectetur molestias iusto corrupti
                    dolor dolorem neque ullam dignissimos pariatur aliquam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No Product data</div>
        ))
      )}
    </>
  );
};

export default ProductDetail;
