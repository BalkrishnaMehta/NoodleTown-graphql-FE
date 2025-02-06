import { motion } from "framer-motion";
import styles from "../../styles/UI/ImageGridGallery.module.css";
import Skeleton from "react-loading-skeleton";

interface ImageGridGalleryProps {
  primaryImage: string;
  secondaryImage: string;
  ternaryImage: string;
  overlayText?: string;
  gridGap2x?: boolean;
  rounded?: boolean;
  gridItemHeight?: boolean;
  animateOnce?: boolean;
}

const ImageGridGallery = ({
  primaryImage,
  secondaryImage,
  ternaryImage,
  overlayText,
  gridGap2x,
  rounded,
  gridItemHeight,
  animateOnce,
}: ImageGridGalleryProps) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className={`${styles.grid} ${gridGap2x ? styles.gap2x : ""} ${
        gridItemHeight ? styles.grid_item_height : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={animateOnce ? { once: true } : { once: false }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}>
      <motion.div
        className={styles.main}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}>
        <img
          src={primaryImage}
          alt="primary image"
          className={rounded ? styles.rounded : ""}
        />
        {overlayText && (
          <motion.div
            className={`text-white row align-center ${styles.overlay}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <h2>{overlayText}</h2>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <img
          src={secondaryImage}
          alt="secondary image"
          className={rounded ? styles.rounded : ""}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <img
          src={ternaryImage}
          alt="ternary image"
          className={rounded ? styles.rounded : ""}
        />
      </motion.div>
    </motion.div>
  );
};

ImageGridGallery.Skeleton = () => {
  return (
    <div className={`${styles.grid} ${styles.grid_item_height}`}>
      <div className={styles.main}>
        <Skeleton height="100%" />
      </div>

      <div>
        <Skeleton height="100%" />
      </div>

      <div>
        <Skeleton height="100%" />
      </div>
    </div>
  );
};

export default ImageGridGallery;
