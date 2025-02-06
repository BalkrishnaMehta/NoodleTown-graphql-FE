import { ReactNode } from "react";

import styles from "../../styles/Home/Banner.module.css";

interface BannerProps {
  children: ReactNode;
  banner: string;
}

const Banner = ({ children, banner }: BannerProps) => {
  return (
    <section className={styles.banner}>
      <img src={banner} alt="" />
      <div className={`row align-center ${styles.container}`}>{children}</div>
    </section>
  );
};

export default Banner;
