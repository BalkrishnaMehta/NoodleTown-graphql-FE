import { Instagram } from "lucide-react";

import styles from "../../styles/Home/Social.module.css";
import { pizzas } from "../../assets";

export default function Social() {
  return (
    <section className={`p-2 inter-font ${styles.social}`}>
      <div className={`container ${styles.gridContainer}`}>
        <div className="grid gap-1">
          {pizzas.map((pizza, index) => (
            <img key={index} src={pizza} alt={`pizza${index}`} />
          ))}
        </div>
        <div className={`text-white ${styles.overlay}`}>
          <p>Follow Us On Instagram To See Pictures Taken By Our Customers</p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className={styles.insta_link}>
            <Instagram size={20} /> &nbsp;: @santorins
          </a>
        </div>
      </div>
    </section>
  );
}
