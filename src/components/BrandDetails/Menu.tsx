import { useRef, useState } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import styles from "../../styles/BrandDetails/Menu.module.css";

interface MenuImageProps {
  imageUrl: string;
  title: string;
}

const MenuImage = ({ imageUrl, title }: MenuImageProps) => {
  const modal = useRef<ModalHandle>(null);
  const [currentImage, setCurrentImage] = useState<string>("");

  const handleZoomImage = () => {
    setCurrentImage(imageUrl);
    modal.current?.open();
  };

  const closeModal = () => {
    modal.current?.close();
  };

  return (
    <>
      <div>
        <img
          src={imageUrl}
          className="brand-image"
          alt={title}
          onClick={handleZoomImage}
          style={{ cursor: "pointer" }}
        />
        <p>{title}</p>
      </div>
      <Modal ref={modal}>
        <div className={styles.img_container}>
          <img src={currentImage} alt="Zoomed menu" />
          <button onClick={closeModal} className={styles.close_btn}>
            X
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MenuImage;
