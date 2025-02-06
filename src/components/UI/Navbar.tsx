import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import styles from "../../styles/UI/Navbar.module.css";
import { RootState } from "../../store";

const Navbar = ({ textWhite }: { textWhite?: boolean }) => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <h4 className="text-primary">Noodletown</h4>
      </Link>
      <ul>
        <li>
          <Link to="/brands" className={textWhite ? "text-white" : undefined}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/profile" className={textWhite ? "text-white" : undefined}>
            <User />
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className={`${styles.cart} ${textWhite ? "text-white" : ""}`}>
            <span>{cartItemCount}</span>
            <ShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
