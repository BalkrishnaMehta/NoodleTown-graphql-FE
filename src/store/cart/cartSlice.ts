import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItem from "../../models/CartItem";
import Product from "../../models/Product";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    setCartForUnauthenticated: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    updateCartItem: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        operation: "add" | "remove";
      }>
    ) => {
      const { product, quantity, operation } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (operation === "add") {
        if (itemIndex > -1) {
          state.items[itemIndex].quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
      } else {
        if (itemIndex > -1) {
          state.items[itemIndex].quantity -= quantity;
          if (state.items[itemIndex].quantity <= 0) {
            state.items.splice(itemIndex, 1);
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
