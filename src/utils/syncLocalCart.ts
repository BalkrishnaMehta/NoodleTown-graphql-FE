import { Dispatch } from "@reduxjs/toolkit";
import CartItem from "../models/CartItem";
import { cartActions } from "../store/cart/cartSlice";
import errorToasting from "./errorToasting";

type AddToCartResponse = {
  addToCart: {
    cartItems: CartItem[];
  };
};

type AddToCartVariables = {
  productId: string;
  quantity: number;
};

export default async function syncLocalCart(
  addToCart: (options: {
    variables: AddToCartVariables;
  }) => Promise<{ data?: AddToCartResponse }>,
  dispatch: Dispatch
) {
  const localCart: CartItem[] = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );

  if (localCart && localCart.length > 0) {
    try {
      for (const cartItem of localCart) {
        const { data: updatedCart } = await addToCart({
          variables: {
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
          },
        });

        if (updatedCart) {
          console.log("returned cart", updatedCart.addToCart.cartItems);
          dispatch(cartActions.setCart(updatedCart.addToCart.cartItems));
        }
      }
      localStorage.removeItem("cartItems");
    } catch (error) {
      errorToasting(
        error instanceof Error ? error : new Error("Error syncing cart")
      );
    }
  }
}
