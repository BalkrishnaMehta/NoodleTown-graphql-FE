import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/Product";
import { RootState } from "../../store";
import QuantityControl from "../Cart/QuantityControl";
import { PrimaryButton } from "../UI/Button";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../../apollo/graphql/mutations/userMutation";
import { cartActions } from "../../store/cart/cartSlice";
import errorToasting from "../../utils/errorToasting";

interface ProductCartActionsProps {
  product: Product;
}

export default function ProductCartActions({
  product,
}: ProductCartActionsProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const [addToCart] = useMutation(ADD_TO_CART, {
    onError(error) {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: 1,
          operation: "remove",
        })
      );
      errorToasting(error || new Error("Error updating cart"));
    },
    onCompleted() {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: 1,
          operation: "add",
        })
      );
    },
  });

  const quantity =
    cart?.find((item) => item.product.id === product.id)?.quantity ?? 0;

  const handleAddToCart = async () => {
    await addToCart({
      variables: {
        productId: product.id,
        quantity: 1,
      },
    });
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {quantity === 0 ? (
          <motion.div
            key="add-to-cart-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              opacity: { duration: 0.15 },
              y: { type: "spring", stiffness: 300, damping: 25 },
            }}>
            <PrimaryButton classes="add-to-cart-btn" onClick={handleAddToCart}>
              Add To Cart
            </PrimaryButton>
          </motion.div>
        ) : (
          <motion.div
            key="quantity-control"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              opacity: { duration: 0.15 },
              y: { type: "spring", stiffness: 300, damping: 25 },
            }}>
            <QuantityControl product={product} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
