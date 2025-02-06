import { useState } from "react";

import styles from "../../styles/BrandDetails/ProductCategories.module.css";
import Product from "../../models/Product";
import { useNavigate } from "react-router-dom";
import ProductCartActions from "./ProductCartActions";
import Category from "../../models/Category";
import Image from "../UI/Image";
import Skeleton from "react-loading-skeleton";

export default function ProductCategories({ menu }: { menu: Category[] }) {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="p-2">
      <div className="detailpage-container">
        <h4 className="text-500">Order Online</h4>
        <div className="row gap-2 sm-col my-2">
          <ul className={`my-2 ${styles.categories}`}>
            {menu.map((category, index) => (
              <li
                onClick={() => {
                  setTabIndex(index);
                }}
                className={index === tabIndex ? styles.active : ""}
                key={`category${index}`}>
                {`${category.name} ${
                  category.name === "Recommended"
                    ? ""
                    : `(${category.products.length})`
                }`}
              </li>
            ))}
          </ul>
          <div className={styles.items}>
            <h2 className="text-500">{menu[tabIndex].name}</h2>
            <ul>
              {menu[tabIndex].products.map((foodItem: Product) => {
                return (
                  <div
                    className={`my-2 row gap-1 ${styles.item_Card}`}
                    key={foodItem.title}
                    onClick={() => navigate(`/products/${foodItem.id}`)}>
                    <div>
                      <Image
                        src={foodItem.imageUrl || ""}
                        alt={foodItem.title}
                        classes={styles.item_image}
                      />
                    </div>
                    <div className={styles.data_item_content}>
                      <p>{foodItem.title}</p>
                      <p className={styles.description}>
                        {foodItem.description}
                      </p>
                      <p className={styles.price}>{`₹${foodItem.price}`}</p>
                      <div
                        className={styles.productActions}
                        onClick={(e) => e.stopPropagation()}>
                        <ProductCartActions product={foodItem} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

ProductCategories.Skeleton = () => {
  return (
    <div className="p-2 detailpage-container">
      <h4 className="text-500">Order Online</h4>
      <div className="row gap-2 sm-col my-2">
        <ul className={`my-2 ${styles.categories}`}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Skeleton width={230} height={32} />
              </li>
            ))}
        </ul>
        <div className={styles.items}>
          <Skeleton height={36} width={250} />
          <ul>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  className={`my-2 row gap-1 ${styles.item_Card}`}
                  key={index}>
                  <div className={styles.item_image}>
                    <Skeleton className={styles.item_image} />
                  </div>
                  <div className={styles.data_item_content}>
                    <p>
                      <Skeleton height={24} width={180} />
                    </p>
                    <p className={styles.description}>
                      <Skeleton height={12} width={280} />
                    </p>
                    <p className={styles.price}>
                      <Skeleton height={24} width={80} />
                    </p>
                    <div>
                      <Skeleton height={32} width={150} />
                    </div>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
