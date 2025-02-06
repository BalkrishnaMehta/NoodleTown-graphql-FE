import Restaurant from "../../models/Restaurant";

import { OutlineButton, PrimaryButton } from "../UI/Button";
import { Link } from "react-router-dom";

import { timeFormatter } from "../../utils/timeFormatter";

import styles from "../../styles/BrandDetails/BrandHero.module.css";
import Skeleton from "react-loading-skeleton";

const DetailViewHero = ({ details }: { details: Restaurant }) => {
  const date = new Date(Date.now());
  const currentDay = date.getDay();
  let linkData = (details.title + " " + details.address).split(" ").join("+");
  return (
    <section className="p-2">
      <div className="detailpage-container">
        <div className="row gap-2 justify-center sm-col">
          <img src={details.logo} alt={details.title} className={styles.logo} />
          <div>
            <h2>{details.title}</h2>
            <div className={`row gap-2 sm-col ${styles.data}`}>
              <div>
                <p>{details.tags.join(", ")}</p>
                <p>{details.address}</p>
                <p>
                  <span className={styles.shop_indicator}>
                    {details.shopTiming[currentDay]
                      ? date.getHours() > details.shopTiming[currentDay][0] &&
                        date.getHours() < details.shopTiming[currentDay][1]
                        ? "Open Now "
                        : "Closed "
                      : "Closed"}
                  </span>
                  {details.shopTiming[currentDay] &&
                    timeFormatter(
                      details.shopTiming[currentDay][0],
                      details.shopTiming[currentDay][1]
                    )}
                  {" (Today)"}
                </p>
              </div>
              <div>
                <p>
                  Average Cost:{" "}
                  <span className={styles.cost}>
                    {details.averageOrderValue} per {details.typicalGroupSize}{" "}
                    Person
                  </span>
                </p>
              </div>
            </div>
            <div className={`row gap-3 sm-col ${styles.btns}`}>
              <Link to="../cart">
                <PrimaryButton>Order Now</PrimaryButton>
              </Link>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${linkData}`}
                target="_blank"
                rel="noopener noreferrer">
                <OutlineButton>Directions</OutlineButton>
              </a>

              <a
                href={`https://x.com/intent/tweet?text=Check+out+${linkData}!`}
                target="_blank"
                rel="noopener noreferrer">
                <OutlineButton>Share</OutlineButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DetailViewHero.Skeleton = () => {
  return (
    <div className="p-2 detailpage-container">
      <div className="row gap-2 justify-center sm-col">
        <Skeleton className={styles.logo} />
        <div>
          <Skeleton
            height={24}
            width={300}
            className={styles.skeleton_heading_bottom}
          />
          <div className={`row gap-2 sm-col ${styles.data}`}>
            <div>
              <Skeleton count={3} width={300} />
            </div>
            <div>
              <Skeleton count={3} width={300} />
            </div>
          </div>
          <div className={`row gap-3 sm-col ${styles.btns}`}>
            <div>
              <Skeleton height={36} borderRadius={3.2} />
            </div>
            <div>
              <Skeleton height={36} borderRadius={3.2} />
            </div>
            <div>
              <Skeleton height={36} borderRadius={3.2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewHero;
