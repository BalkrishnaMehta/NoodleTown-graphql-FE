import { useState } from "react";

const Image = ({
  src,
  alt,
  classes,
  ...props
}: {
  src: string;
  alt: string;
  classes: string;
}) => {
  const fallbackSrc =
    "https://res.cloudinary.com/dt3japg4o/image/upload/f_auto,q_auto/error5";
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={classes}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default Image;
