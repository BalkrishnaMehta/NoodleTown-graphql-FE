import { useEffect, useState } from "react";
import Product from "../../models/Product";
import Tabs from "../UI/Tabs";
import RecipeCard from "../UI/cards/RecipeCard";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_RECIPIES } from "../../apollo/graphql/queries/productQueries";
import errorToasting from "../../utils/errorToasting";
import styles from "../../styles/Home/Recipes.module.css";

interface PopularCategory {
  name: string;
  products: Product[];
}

const Recipes = () => {
  const { loading, error, data } = useQuery<{
    getPopularCategories: PopularCategory[];
  }>(GET_POPULAR_RECIPIES);

  const popularRecipies: PopularCategory[] = data?.getPopularCategories || [];

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabs = popularRecipies.map(
    (category: PopularCategory) => category.name
  );
  const recipesData = popularRecipies.map(
    (category: PopularCategory) => category.products
  );
  const currentRecipes = recipesData[tabIndex] || [];

  const tabClickHandler = (index: number) => {
    setTabIndex(index);
  };

  return (
    <section className="my-2 inter-font">
      <div className={`col align-center gap-5 ${styles.content}`}>
        <h2>Popular Recipes</h2>
        {loading ? (
          <Tabs.Skeleton />
        ) : (
          <Tabs
            tabs={tabs}
            activeIndex={tabIndex}
            tabClickHandler={tabClickHandler}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="my-2 row x-scroll-hidden">
          {loading ? (
            <RecipeCard.Skeleton count={6} />
          ) : (
            <RecipeCard recipes={currentRecipes} />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Recipes;
