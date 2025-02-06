import { Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import styles from "../../../styles/UI/cards/RecipeCard.module.css";
import Product from "../../../models/Product";
import Image from "../Image";
import { useNavigate } from "react-router-dom";
import CartItem from "../../../models/CartItem";
import { useState } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../../apollo/graphql/mutations/userMutation";
import { cartActions } from "../../../store/cart/cartSlice";
import errorToasting from "../../../utils/errorToasting";

interface RecipeCardProps {
  recipes: Product[];
}

const RecipeCard = ({ recipes }: RecipeCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);

  const [addToCart] = useMutation(ADD_TO_CART, {
    onError(error) {
      const product = recipes.find((r) => r.id === animatingItem);
      if (product) {
        dispatch(
          cartActions.updateCartItem({
            product,
            quantity: 1,
            operation: "remove",
          })
        );
        errorToasting(error || new Error("Error adding to cart"));
      }
    },
    onCompleted() {
      const product = recipes.find((r) => r.id === animatingItem);
      if (product) {
        dispatch(
          cartActions.updateCartItem({
            product,
            quantity: 1,
            operation: "add",
          })
        );
      }
      setTimeout(() => setAnimatingItem(null), 500);
    },
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    onError(error) {
      const product = recipes.find((r) => r.id === animatingItem);
      if (product) {
        dispatch(
          cartActions.updateCartItem({
            product,
            quantity: 1,
            operation: "add",
          })
        );
        errorToasting(error || new Error("Error removing from cart"));
      }
    },
    onCompleted() {
      const product = recipes.find((r) => r.id === animatingItem);
      if (product) {
        dispatch(
          cartActions.updateCartItem({
            product,
            quantity: 1,
            operation: "remove",
          })
        );
      }
      setTimeout(() => setAnimatingItem(null), 500);
    },
  });

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatingItem(product.id);
    try {
      await addToCart({
        variables: {
          productId: product.id,
          quantity: 1,
        },
      });
    } catch (error) {
      // Error handled in onError callback
    }
  };

  const handleRemoveFromCart = async (
    product: Product,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setAnimatingItem(product.id);
    try {
      await removeFromCart({
        variables: {
          productId: product.id,
          quantity: 1,
        },
      });
    } catch (error) {
      // Error handled in onError callback
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cartAnimation = {
    initial: { scale: 1, rotate: -45 },
    animate: { scale: 1.05, rotate: 315 },
    exit: { scale: 0.8, opacity: 0, rotate: -45 },
    transition: { duration: 0.5 },
  };

  return recipes.map((recipe, index) => {
    const inCart =
      cart?.some((item: CartItem) => item.product.id === recipe.id) ?? false;

    return (
      <motion.div
        key={recipe.id}
        onClick={() => navigate(`/products/${recipe.id}`)}
        className={`col align-center ${styles.card}`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}>
        <Image
          classes={styles.item_image}
          src={recipe.imageUrl || ""}
          alt={recipe.title}
        />
        <div>
          <h3 className={styles.title}>{recipe.title}</h3>
        </div>
        <p className={`${styles.description} text-500`}>{recipe.description}</p>
        <h2 className={styles.price}>₹{recipe.price}</h2>

        <div className={styles.triangle} onClick={(e) => e.stopPropagation()}>
          <motion.div
            className={`${styles.circle} ${inCart ? styles.delete : ""}`}
            onClick={
              inCart
                ? (e) => handleRemoveFromCart(recipe, e)
                : (e) => handleAddToCart(recipe, e)
            }
            initial="initial"
            animate={animatingItem === recipe.id ? "animate" : "initial"}
            exit="exit"
            variants={cartAnimation}>
            {inCart ? (
              <Check height={15} width={15} />
            ) : (
              <ShoppingBag height={15} width={15} />
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  });
};

RecipeCard.Skeleton = ({ count = 1 }: { count?: number }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={`col align-center ${styles.card}`}>
        <div className={styles.item_image}>
          <Skeleton className={styles.item_image} borderRadius={16} />
        </div>

        <p className={styles.title}>
          <Skeleton height={20} />
        </p>

        <p className={styles.description}>
          <Skeleton count={2} height={12} />
        </p>

        <div className={styles.price}>
          <Skeleton width={80} height={30} />
        </div>

        <div className={styles.triangle}>
          <Skeleton circle height={32} width={32} />
        </div>
      </div>
    ));
};

export default RecipeCard;
