import { Provider, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import store, { RootState } from "./store";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import BrandDetailView from "./pages/BrandDetailView";
import Authenticate from "./pages/Authenticate";
import Orders from "./pages/Orders";
import OrderDetail from "./components/Orders/OrderDetails";
import Restaurants from "./pages/Restaurants";
import ServiceCategories from "./components/Brand/ServiceCategories";
import { clearAuth, setAuth } from "./store/auth/authSlice";
import { cartActions } from "./store/cart/cartSlice";
import { AuthRoute } from "./routes/AuthRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_CART } from "./apollo/graphql/queries/userQueries";
import CartItem from "./models/CartItem";
import { REFRESH_TOKEN } from "./apollo/graphql/queries/authQueries";

interface Cart {
  cartItems: CartItem[];
}

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const [refreshToken] = useLazyQuery<{
    refreshToken: { accessToken: string; user: { id: string } };
  }>(REFRESH_TOKEN);

  const [fetchCart] = useLazyQuery<{
    getUserById: { cart: { cartItems: CartItem[] } };
  }>(GET_USER_CART);

  const handleTokenRefresh = useCallback(async () => {
    try {
      const { data } = await refreshToken();
      if (data) {
        dispatch(setAuth(data.refreshToken));
      }
    } catch (error) {
      clearAuth();
      console.error("Failed to refresh token:", error);
    }
  }, [refreshToken, dispatch]);

  useEffect(() => {
    if (user) {
      refreshIntervalRef.current = setInterval(() => {
        handleTokenRefresh();
      }, 14 * 60 * 1000);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [user, handleTokenRefresh]);

  useEffect(() => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      dispatch(cartActions.setCartForUnauthenticated(localCart));
      setIsCartInitialized(true);
    }
  }, [user, dispatch]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (user) {
        try {
          const { data: cartData } = await fetchCart();
          if (cartData) {
            dispatch(
              cartActions.setCart(cartData.getUserById.cart?.cartItems || [])
            );
          }
          setIsCartInitialized(true);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          setIsCartInitialized(true);
        }
        setIsAuthInitialized(true);
      } else {
        try {
          const { data } = await refreshToken();
          if (data) {
            dispatch(setAuth(data.refreshToken));
          }
          setIsAuthInitialized(true);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          setIsAuthInitialized(true);
        }
      }
    };

    initializeAuth();
  }, [user, fetchCart, refreshToken, dispatch]);

  if (!isAuthInitialized || !isCartInitialized) {
    return null;
  }

  const router = createBrowserRouter([
    {
      path: "/authenticate",
      element: <AuthRoute />,
      children: [{ path: "/authenticate", element: <Authenticate /> }],
    },
    { path: "/", element: <Home /> },
    { path: "/restaurants", element: <Restaurants /> },
    { path: "/brands", element: <Brands /> },
    { path: "/brands/:brand", element: <BrandDetailView /> },
    {
      path: "/categories/:category",
      element: <ServiceCategories />,
    },
    { path: "/products/:product", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/orders", element: <Orders /> },
        { path: "/orders/:orderId", element: <OrderDetail /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}
