import { useParams, Link, useSearchParams } from "react-router-dom";
import Navbar from "../UI/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Brands/ServiceCategories.module.css";
import Product from "../../models/Product";
import Image from "../UI/Image";
import errorToasting from "../../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { Pagination } from "../UI/Pagination";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIZED_PRODUCTS } from "../../apollo/graphql/queries/productQueries";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export default function ServiceCategories() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const categoryName = category?.split("-").join(" ");

  const { loading, error, data } = useQuery<{
    getProductsByCategory: {
      limit: number;
      page: number;
      totalPages: number;
      totalRecords: number;
      results: Product[];
    };
  }>(GET_CATEGORIZED_PRODUCTS, {
    variables: { category: category || "", page: currentPage },
  });

  const products: Product[] = data?.getProductsByCategory?.results || [];
  const totalPages = data?.getProductsByCategory?.totalPages || 1;

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <>
      <Navbar />
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-500 px-4">
        {categoryName}
      </motion.h2>
      <div className="category-container p-2">
        {loading ? (
          <div className={styles.productGrid}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={styles.productCard}>
                  <div className="w-100 p-2">
                    <Skeleton className={styles.cardImage} />
                  </div>
                  <div className="p-1">
                    <Skeleton height={24} />
                    <div
                      className={`row align-center justify-between ${styles.productDetails}`}>
                      <Skeleton width={80} height={20} />
                      <Skeleton width={60} className={styles.vegTag} />
                    </div>
                    <p className={styles.productDescription}>
                      <Skeleton count={2} height={12} />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={styles.productGrid}>
              <AnimatePresence>
                {products.map((product: Product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className={styles.productCard}>
                    <Link to={`/products/${product.id}`}>
                      <div className="w-100 p-2">
                        <Image
                          src={product.imageUrl || ""}
                          alt={product.title}
                          classes={styles.cardImage}
                        />
                      </div>
                      <div className="p-1">
                        <h3 className="text-500">{product.title}</h3>
                        <div
                          className={`row align-center justify-between ${styles.productDetails}`}>
                          <span>₹{product.price}</span>
                          <span
                            className={
                              product.isVeg ? styles.vegTag : styles.nonVegTag
                            }>
                            {product.isVeg ? "Veg" : "Non-Veg"}
                          </span>
                        </div>
                        <p className={styles.productDescription}>
                          {product.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.noProductsMessage}>
            {`No products found in ${categoryName} category.`}
          </motion.div>
        )}
      </div>
    </>
  );
}
