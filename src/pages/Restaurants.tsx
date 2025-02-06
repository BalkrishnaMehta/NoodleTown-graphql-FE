import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/UI/Navbar";
import styles from "../styles/pages/Restaurants.module.css";
import Restaurant from "../models/Restaurant";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS_BY_ATTRIBUTE } from "../apollo/graphql/queries/restaurantQueries";

export default function Restaurants() {
  const location = useLocation();
  const serviceType = new URLSearchParams(location.search).get("service-type");
  const cuisine = new URLSearchParams(location.search)
    .get("cuisine")
    ?.split("_")
    .join(" ");

  let type = "";
  let value = "";

  if (serviceType) {
    type = "service-type";
    value = serviceType;
  }

  if (cuisine) {
    type = "cuisine";
    value = cuisine;
  }

  const { loading, error, data } = useQuery<{
    getRestaurantsByAttribute: Restaurant[];
  }>(GET_RESTAURANTS_BY_ATTRIBUTE, {
    variables: { serviceType, cuisine },
  });

  const restaurants: Restaurant[] = data?.getRestaurantsByAttribute || [];

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      <Navbar />
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-500 px-4">
        {` ${value
          .split("_")
          .map((v) => {
            const s = v.toLowerCase();
            return s[0].toUpperCase() + s.slice(1);
          })
          .join(" ")} Restaurants`}
      </motion.h2>
      <div className="category-container p-2">
        {loading ? (
          <div className={styles.restaurantGrid}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={styles.restaurantCard}>
                  <div className="p-2">
                    <Skeleton className={styles.cardImage} />
                  </div>
                  <div className="p-1">
                    <Skeleton width="55%" height={24} borderRadius={6} />
                    <div
                      className={`row align-center ${styles.restaurantDetails}`}>
                      <Skeleton width={80} height={20} />
                      <span className={styles.dot}>•</span>
                      <Skeleton width={70} height={20} />
                    </div>
                    <div className="row wrap gap-half">
                      {Array(3)
                        .fill(null)
                        .map((_, tagIndex) => (
                          <Skeleton
                            key={tagIndex}
                            width={60}
                            height={20}
                            borderRadius={20}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : restaurants && restaurants.length !== 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.restaurantGrid}>
            <AnimatePresence>
              {restaurants.map((restaurant: Restaurant) => (
                <motion.div
                  key={restaurant.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className={styles.restaurantCard}>
                  <Link to={`/brands/${restaurant.id}`}>
                    <div className="w-100 p-2">
                      <motion.img
                        src={restaurant.logo}
                        alt={restaurant.title}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className="p-1">
                      <h3 className="text-500">{restaurant.title}</h3>
                      <div
                        className={`row align-center ${styles.restaurantDetails}`}>
                        <span>{restaurant.address}</span>
                        <span className={styles.dot}>•</span>
                        <span>₹{restaurant.averageOrderValue} avg</span>
                      </div>
                      <div className="row wrap gap-half">
                        {restaurant.tags.map((tag: string, i: number) => (
                          <span key={`${tag}-${i}`} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.noRestaurantsMessage}>
            {`No restaurants found for ${value} ${type.split("_").join(" ")}.`}
          </motion.div>
        )}
      </div>
    </div>
  );
}
