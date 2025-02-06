import { motion } from "framer-motion";
import styles from "../../../styles/UI/cards/Card.module.css";
import Image from "../Image";

interface CardProps {
  primaryText: string;
  primaryFontBold?: boolean;
  secondaryText: string;
  image: string;
  shadow?: boolean;
  paraPadding?: boolean;
  imgHeightClass: string;
  overlayText?: boolean;
  flexBasis?: boolean;
  borderRadius?: string;
  animate?: boolean;
  onClick?: () => void;
}

const Card = ({
  primaryText,
  primaryFontBold,
  secondaryText,
  image,
  shadow,
  paraPadding,
  imgHeightClass,
  overlayText,
  flexBasis,
  borderRadius,
  animate,
  onClick,
}: CardProps) => {
  let radiusClass = "";

  if (borderRadius === "top") {
    radiusClass = "border_top";
  } else if (borderRadius === "all") {
    radiusClass = "border_all";
  }

  return (
    <motion.div
      whileHover={animate ? { scale: 1.1 } : { scale: 1 }}
      whileTap={animate ? { scale: 1.05 } : { scale: 1 }}
      className={`${styles.card} ${shadow ? styles.shadow : ""} ${
        flexBasis ? styles.flex_basis : ""
      }`}
      onClick={onClick}>
      <Image
        src={image || ""}
        alt={primaryText}
        classes={`${styles[radiusClass]} ${styles[imgHeightClass]}`}
      />
      <div
        className={`${paraPadding ? styles.data : ""} ${
          overlayText ? styles.overlay : ""
        }`}>
        <h4 className={primaryFontBold ? "text-600" : "text-400"}>
          {primaryText}
        </h4>
        <p>{secondaryText}</p>
      </div>
    </motion.div>
  );
};

export default Card;
