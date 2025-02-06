import { useParams } from "react-router-dom";
import Navbar from "../../components/UI/Navbar";
import { motion } from "framer-motion";
import styles from "../../styles/Orders/OrderDetail.module.css";
import { CheckCircle, MapPin, DollarSign } from "lucide-react";
import Image from "../UI/Image";
import CartItem from "../../models/CartItem";
import { useEffect } from "react";
import errorToasting from "../../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";
import { GET_ORDER_DETAILS } from "../../apollo/graphql/queries/userQueries";
import Order from "../../models/Order";

const OrderDetail = () => {
  const { orderId } = useParams();

  const { loading, error, data } = useQuery<{
    getOrderDetails: Order;
  }>(GET_ORDER_DETAILS, { variables: { id: orderId || "" } });

  const orderData: Order = data?.getOrderDetails!;

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  return (
    <div className={styles.orderDetailPage}>
      <Navbar />
      <div className="container p-2">
        {loading ? (
          <div className="col gap-2">
            <div className={styles.orderHeader}>
              <div className="row justify-between align-center">
                <h1 className={styles.orderHeading}>
                  <Skeleton width={400} />
                </h1>
                <div className={`${styles.orderStatus} gap-half`}>
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={100} />
                </div>
              </div>
            </div>
            <div className={styles.orderSummary}>
              <h2>
                <Skeleton width={200} />
              </h2>
              <div className={`${styles.summaryItem} gap-1`}>
                <Skeleton width={20} height={20} />
                <div>
                  <Skeleton width={150} />
                  <Skeleton width={250} />
                </div>
              </div>
              <div className={`${styles.summaryItem} gap-1`}>
                <Skeleton width={20} height={20} />
                <div>
                  <Skeleton width={150} />
                  <Skeleton width={250} />
                  <Skeleton width={250} />
                </div>
              </div>
            </div>
            <div className={styles.productList}>
              <h2>
                <Skeleton width={200} />
              </h2>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={styles.productCard}>
                  <Skeleton className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <Skeleton width={150} />
                    <Skeleton width={250} />
                    <div className={styles.productDetails}>
                      <Skeleton width={100} />
                      <Skeleton width={100} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div>Error loading order details</div>
        ) : (
          <div className="col gap-2">
            <motion.div
              className={styles.orderHeader}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="row justify-between align-center">
                <h1 className={styles.orderHeading}>Order #{orderData.id}</h1>
                <div className={styles.orderStatus}>
                  <CheckCircle size={24} className={styles.statusIcon} />
                  <span>{orderData.status}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className={styles.orderSummary}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <h2>Order Summary</h2>
              <div className={styles.summaryItem}>
                <MapPin size={20} className={styles.summaryIcon} />
                <div>
                  <strong>Shipping Address</strong>
                  <p>{orderData.address}</p>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <DollarSign size={20} className={styles.summaryIcon} />
                <div>
                  <strong>Financial Breakdown</strong>
                  <p>Total: ₹{orderData.total}</p>
                  <p>Discount: ₹{orderData.discount}</p>
                  <p>Net Total: ₹{orderData.netTotal}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className={styles.productList}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              <h2>Products in Order</h2>
              {orderData.products.map((item: CartItem, index: number) => (
                <motion.div
                  key={index}
                  className={styles.productCard}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    classes={styles.productImage}
                    src={item.product.imageUrl || ""}
                    alt={item.product.title}
                  />
                  <div className={styles.productInfo}>
                    <h3>{item.product.title}</h3>
                    <p className={styles.productDescription}>
                      {item.product.description}
                    </p>
                    <div className={styles.productDetails}>
                      <span>Price: ₹{item.product.price}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
