import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/UI/cards/CartCard.module.css";
import Skeleton from "react-loading-skeleton";
import QuantityControl from "../../Cart/QuantityControl";
import Image from "../Image";
import Product from "../../../models/Product";

export default function CartCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      className={styles.card}
      onClick={() => navigate(`/products/${product.id}`)}>
      <Image
        src={product.imageUrl || ""}
        alt={product.title}
        classes={styles.card_img}
      />
      <div className={styles.data}>
        <div className="row justify-between">
          <h4 className={styles.heading}>{product.title}</h4>
          <p className="text-primary">{`₹${product.price}`}</p>
        </div>
        <p className={`secondary-text ${styles.description}`}>
          {product.description}
        </p>
      </div>
      <QuantityControl product={product} />
    </motion.div>
  );
}

CartCard.Skeleton = () => (
  <div className={styles.card}>
    <div className={styles.card_img}>
      <Skeleton className={styles.card_img} />
    </div>
    <div className={styles.data}>
      <div className={`row align-center justify-between ${styles.heading}`}>
        <Skeleton width={160} height={20} />
        <Skeleton width={60} height={20} />
      </div>
      <p className={`secondary-text ${styles.description}`}>
        <Skeleton count={2} height={12} />
      </p>
    </div>
    <QuantityControl.Skeleton />
  </div>
);
