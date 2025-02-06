import { useNavigate } from "react-router-dom";
import ServiceType from "../../models/ServiceType";
import Card from "../UI/cards/Card";

const Services = ({ serviceTypes }: { serviceTypes: ServiceType[] }) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="p-2 container row gap-3 justify-between sm-col">
        {serviceTypes.map((serviceType, index) => {
          return (
            <Card
              onClick={() => {
                navigate(
                  `/restaurants?service-type=${serviceType.primaryText
                    .split(" ")
                    .join("_")
                    .toUpperCase()}`
                );
              }}
              key={`serviceType${index}`}
              primaryText={serviceType.primaryText}
              secondaryText={serviceType.secondaryText}
              image={serviceType.image}
              shadow
              paraPadding
              imgHeightClass={"img_height1"}
              borderRadius={"top"}
              animate
            />
          );
        })}
      </div>
    </section>
  );
};

export default Services;
