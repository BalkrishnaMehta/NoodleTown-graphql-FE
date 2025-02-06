import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../../styles/UI/cards/CircularCards.module.css";
import Restaurant from "../../../models/Restaurant";

interface CircularCardsProps {
  data: Pick<Restaurant, "id" | "title" | "logo">[];
  titleMargin?: boolean;
  divider?: boolean;
  link?: string;
  type?: string;
}

const CircularCards = ({
  data,
  titleMargin,
  divider,
  type,
}: CircularCardsProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className={`my-2 row gap-3 justify-between align-center text-center ${
        type === "brand" ? "x-scroll-hidden" : "sm-col"
      }`}>
      {data.map((elem, index) => {
        const content = (
          <motion.div
            onClick={() => {
              if (type === "brand") {
                navigate(`/brands/${elem.id}`);
              } else {
                navigate(
                  `restaurants?cuisine=${elem.title.split(" ").join("_")}`
                );
              }
            }}
            key={`card-${index}`}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 100 }}
            className={styles.circular_card}>
            <img src={elem.logo} alt={elem.title} />
            <p className={`text-600 ${titleMargin ? styles.brand_title : ""}`}>
              {elem.title}
            </p>
          </motion.div>
        );

        return (
          <Fragment key={`data${index + 1}`}>
            {content}
            {divider && data.length !== index + 1 && (
              <div className={styles.divider}></div>
            )}
          </Fragment>
        );
      })}
    </motion.div>
  );
};

export default CircularCards;
