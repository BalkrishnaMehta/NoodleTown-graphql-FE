import { FormEvent } from "react";
import styles from "../../styles/forms/CouponForm.module.css";
import { PrimaryButton } from "../UI/Button";
import Spinner from "../UI/Spinner";

interface CouponFormProps {
  handleApplyCouponCode: (event: FormEvent<HTMLFormElement>) => void;
  couponMessage: string;
  isApplyingCoupon: boolean;
}

const CouponForm = ({
  handleApplyCouponCode,
  couponMessage,
  isApplyingCoupon,
}: CouponFormProps) => {
  return (
    <form
      onSubmit={(event) => handleApplyCouponCode(event)}
      className={styles.coupon_form}>
      <div className={`row ${styles.coupon_grp}`}>
        <input type="text" placeholder="Apply coupon code" name="coupon" />
        <PrimaryButton disabled={isApplyingCoupon}>
          {isApplyingCoupon ? (
            <Spinner size="15px" color="#fff" borderThickness="2px" />
          ) : (
            "Apply"
          )}
        </PrimaryButton>
      </div>
      <p className="secondary-text">
        {couponMessage ? couponMessage : "\u00A0"}
      </p>
    </form>
  );
};

export default CouponForm;
