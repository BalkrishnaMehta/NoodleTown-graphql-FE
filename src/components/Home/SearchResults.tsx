import { Fragment, useState } from "react";
import styles from "../../styles/Home/SearchResults.module.css";
import Product from "../../models/Product";
import Category from "../../models/Category";
import Restaurant from "../../models/Restaurant";
import Image from "../UI/Image";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchResult from "../../models/SearchResult";

const SearchResults = ({ results }: { results: SearchResult[] }) => {
  const navigate = useNavigate();
  const [opencategoryId, setOpenCategoryId] = useState("");

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const renderTypeLabel = (type: "restaurant" | "product" | "category") => {
    const typeStyles = {
      restaurant: styles.restaurant_type,
      product: styles.product_type,
      category: styles.category_type,
    };

    return (
      <div className={`${styles.type_label} ${typeStyles[type]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
    );
  };

  const renderRestaurant = (
    restaurant: Restaurant,
    type: "restaurant" | "product" | "category"
  ) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => {
        navigate(`/brands/${restaurant.id}`);
      }}
      key={restaurant.id}
      className={`row align-center ${styles.result_item} ${styles.restaurant}`}>
      {renderTypeLabel(type)}
      <div className={`row align-center justify-center ${styles.result_logo}`}>
        <Image
          src={restaurant.logo || ""}
          alt={restaurant.title}
          classes={styles.logo_image}
        />
      </div>
      <div className={styles.result_details}>
        <h3 className={`row ${styles.result_title}`}>{restaurant.title}</h3>
        <div className={`row justify-between ${styles.result_meta}`}>
          <span>Avg. Order: ₹{restaurant.averageOrderValue}</span>
          <span>Group Size: {restaurant.typicalGroupSize}</span>
        </div>
      </div>
    </motion.div>
  );

  const renderProduct = (
    product: Product,
    type: "restaurant" | "product" | "category"
  ) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      key={product.id}
      className={`row align-center ${styles.result_item}`}
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}>
      {renderTypeLabel(type)}
      <div className={`row align-center justify-center ${styles.result_logo}`}>
        <Image
          src={product.imageUrl || ""}
          alt={product.title}
          classes={styles.logo_image}
        />
      </div>
      <div className={styles.result_details}>
        <h3 className={styles.result_title}>{product.title}</h3>
        <div className={`row justify-between ${styles.result_meta}`}>
          <span className={styles.price}>₹{product.price}</span>
        </div>
      </div>
    </motion.div>
  );

  const renderCategory = (
    category: Category,
    type: "restaurant" | "product" | "category"
  ) => (
    <>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={() => {
          if (opencategoryId === category.id) {
            setOpenCategoryId("");
          } else {
            setOpenCategoryId(category.id);
          }
        }}
        key={category.id}
        className={`row align-center ${styles.result_item} ${styles.category}`}>
        {renderTypeLabel(type)}
        <div className={`${styles.result_details} row justify-between`}>
          <h3 className={`row align-center ${styles.result_title}`}>
            {category.name}
          </h3>
          <div className="row gap-half">
            <p className={styles.product_count}>{category.products.length}</p>
            <p className={styles.product_count}>products</p>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {opencategoryId === category.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="col gap-1 p-1">
            {category.products.length > 0 ? (
              category.products.map((product) =>
                renderProduct(product, "product")
              )
            ) : (
              <div className={styles.no_results}>No products in category</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const renderResultItem = (resultItem: SearchResult) => {
    switch (resultItem.type) {
      case "restaurant":
        return renderRestaurant(resultItem.item as Restaurant, resultItem.type);
      case "product":
        return renderProduct(resultItem.item as Product, resultItem.type);
      case "category":
        return renderCategory(resultItem.item as Category, resultItem.type);
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="col gap-1 p-1">
      {results.length > 0 ? (
        results.map((resultItem, index) => (
          <Fragment key={resultItem.item.id || index}>
            {renderResultItem(resultItem)}
          </Fragment>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.no_results}>
          No results found
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchResults;
