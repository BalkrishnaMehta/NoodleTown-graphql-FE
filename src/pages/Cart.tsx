import Navbar from "../components/UI/Navbar";
import { PrimaryButton } from "../components/UI/Button";
import CartCard from "../components/UI/cards/CartCard";

import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../styles/pages/Cart.module.css";
import Checkout from "../components/Cart/Checkout";
import CartItem from "../models/CartItem";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const isLoading = false;

  return (
    <>
      <Navbar />
      <section>
        <h2 className="text-500 px-4">Your Cart</h2>
        <div className="category-container p-2">
          {isLoading ? (
            <div className={styles.cart_layout}>
              <div className={`my-2 row wrap gap-2 ${styles.cart}`}>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <CartCard.Skeleton key={index} />
                  ))}
              </div>
              <Checkout cart={[]} />
            </div>
          ) : cart && cart.length !== 0 ? (
            <div className={styles.cart_layout}>
              <div className={`my-2 row wrap gap-2 ${styles.cart}`}>
                {cart.map((item: CartItem) => (
                  <CartCard key={item.product.title} product={item.product} />
                ))}
              </div>
              <Checkout cart={cart} />
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className="my-2 col gap-2 justify-center align-center text-center empty-cart">
              <img src={emptyCart} alt="Empty cart" />
              <h2>Fill it with deliciousness</h2>
              <Link to={"/brands"}>
                <PrimaryButton>Add Products</PrimaryButton>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
