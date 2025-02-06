import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import styles from "../../styles/UI/Tabs.module.css";

interface TabsProps {
  tabs: string[];
  activeIndex: number;
  tabClickHandler: (index: number) => void;
}

const Tabs = ({ tabs, activeIndex, tabClickHandler }: TabsProps) => {
  return (
    <nav className={styles.tabs}>
      <ul className="row gap-2">
        {tabs.map((tab, index) => (
          <motion.li
            key={tab}
            onClick={() => tabClickHandler(index)}
            className={`text-500 ${
              activeIndex === index ? `text-white ${styles.current}` : ""
            }`}
            initial={false}
            animate={{
              backgroundColor:
                activeIndex === index ? "var(--var-primary-color)" : "#eceef6",
              color: activeIndex === index ? "#ffffff" : "#000000",
            }}
            transition={{ type: "tween", duration: 0.3 }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

Tabs.Skeleton = () => {
  return (
    <nav className={styles.tabs}>
      <ul className="row gap-2">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <li key={index} className={styles.skeletonTab}>
            <Skeleton height="100%" width="100%" borderRadius="2rem" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
