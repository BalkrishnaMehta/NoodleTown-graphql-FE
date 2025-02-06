import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SecondaryButton, PrimaryButton } from "../UI/Button";
import { RootState } from "../../store";
import Product from "../../models/Product";
import { useMutation } from "@apollo/client";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../apollo/graphql/mutations/userMutation";
import { cartActions } from "../../store/cart/cartSlice";
import errorToasting from "../../utils/errorToasting";

interface QuantityControlProps {
  product: Product;
}

export default function QuantityControl({ product }: QuantityControlProps) {
  const dispatch = useDispatch();
  const [updateDelta, setUpdateDelta] = useState<number>(0);

  const [addToCart] = useMutation(ADD_TO_CART, {
    onError(error) {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: Math.abs(updateDelta),
          operation: "remove",
        })
      );
      errorToasting(error || new Error("Error updating cart"));
    },
    onCompleted() {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: Math.abs(updateDelta),
          operation: "add",
        })
      );
    },
  });

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    onError(error) {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: Math.abs(updateDelta),
          operation: "add",
        })
      );
      errorToasting(error || new Error("Error updating cart"));
    },
    onCompleted() {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity: Math.abs(updateDelta),
          operation: "remove",
        })
      );
    },
  });

  const cart = useSelector((state: RootState) => state.cart.items);
  const reduxQuantity =
    cart?.find((item) => item.product.id === product.id)?.quantity ?? 0;

  const [visualQuantity, setVisualQuantity] = useState(reduxQuantity);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisualQuantity(reduxQuantity);
  }, [reduxQuantity]);

  const debouncedUpdateCart = (finalQuantity: number) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const delta = finalQuantity - reduxQuantity;
    setUpdateDelta(delta);

    debounceTimeoutRef.current = setTimeout(() => {
      if (delta !== 0) {
        if (delta > 0) {
          addToCart({
            variables: {
              productId: product.id,
              quantity: Math.abs(delta),
            },
          });
        } else {
          removeFromCart({
            variables: {
              productId: product.id,
              quantity: Math.abs(delta),
            },
          });
        }
      }
    }, 700);
  };

  const handleIncrement = () => {
    const newQuantity = visualQuantity + 1;
    setVisualQuantity(newQuantity);
    debouncedUpdateCart(newQuantity);
  };

  const handleDecrement = () => {
    if (visualQuantity > 0) {
      const newQuantity = visualQuantity - 1;
      setVisualQuantity(newQuantity);
      debouncedUpdateCart(newQuantity);
    }
  };

  return (
    <div
      className="row gap-1 align-center"
      onClick={(e) => e.stopPropagation()}>
      <SecondaryButton
        onClick={handleDecrement}
        disabled={visualQuantity === 0}>
        -
      </SecondaryButton>
      <motion.p
        key={visualQuantity}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          opacity: { duration: 0.15 },
          y: { type: "spring", stiffness: 300, damping: 25 },
        }}>
        {visualQuantity}
      </motion.p>
      <PrimaryButton onClick={handleIncrement}>+</PrimaryButton>
    </div>
  );
}

QuantityControl.Skeleton = () => (
  <div className="row gap-1 align-center">
    <Skeleton width={30} height={30} borderRadius={3.2} />
    <Skeleton width={30} height={30} />
    <Skeleton width={30} height={30} borderRadius={3.2} />
  </div>
);
