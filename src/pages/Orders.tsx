import { useNavigate } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Order from "../models/Order";
import { motion } from "framer-motion";
import styles from "../styles/Orders/Orders.module.css";
import { useEffect } from "react";
import errorToasting from "../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../apollo/graphql/queries/userQueries";

export default function Orders() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{
    getUserById: { orders: Order[] };
  }>(GET_ORDERS);

  const orders: Order[] = data?.getUserById.orders!;

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div>
      <Navbar />
      <section>
        <h2 className="text-500 px-4">Your Orders</h2>
        <div className="detailpage-container p-2">
          {loading ? (
            <div className="col gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.orderRow}>
                  <div className="row justify-between align-center p-1">
                    <div className="col">
                      <span className={styles.orderID}>
                        <Skeleton width={140} />
                      </span>
                      <span className="secondary-text">
                        <Skeleton width={100} />
                      </span>
                    </div>
                    <div>
                      <span className={styles.orderStatus}>
                        <Skeleton width={100} />
                      </span>
                    </div>
                    <div className="col align-end">
                      <span className={styles.orderTotal}>
                        <Skeleton width={100} />
                      </span>
                      <span className="secondary-text">
                        <Skeleton width={140} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="col gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {orders && orders.length > 0 ? (
                orders.map((order: Order) => (
                  <motion.div
                    key={order.id}
                    className={styles.orderRow}
                    onClick={() => handleOrderClick(order.id!)}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}>
                    <div className="row justify-between align-center p-1">
                      <div className="col">
                        <span className={styles.orderID}>
                          Order #{order.id!.slice(0, 8)}
                        </span>
                        <span className="secondary-text">
                          {new Date(order.createdAt!).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className={styles.orderStatus}>
                          {order.status}
                        </span>
                      </div>
                      <div className="col align-end">
                        <span className={styles.orderTotal}>
                          ₹{order.netTotal}
                        </span>
                        <span className="secondary-text">
                          {order.products.length} Product
                          {order.products.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={styles.noOrders}>No orders found</div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
