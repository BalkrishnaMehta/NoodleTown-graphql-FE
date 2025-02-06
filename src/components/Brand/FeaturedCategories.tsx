import { useNavigate } from "react-router-dom";
import { featured } from "../../utils/data";
import Card from "../UI/cards/Card";

export default function FeaturedCategories() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="category-container p-2">
        <div className="my-2 row gap-3 justify-between x-scroll-hidden">
          {featured.map((category, index) => {
            return (
              <Card
                onClick={() => {
                  navigate(
                    `/categories/${category.title.split(" ").join("-")}`
                  );
                }}
                primaryText={category.title}
                primaryFontBold
                secondaryText={category.description}
                image={category.image}
                imgHeightClass={"img_height3"}
                overlayText
                flexBasis
                borderRadius={"all"}
                key={`category${index}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
