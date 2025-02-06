import { FormEvent, useEffect, useState } from "react";
import CouponForm from "../forms/CouponForm";
import CartItem from "../../models/CartItem";
import Addresses from "./Addresses";
import { PrimaryButton } from "../UI/Button";
import Address from "../../models/Address";
import errorToasting from "../../utils/errorToasting";
import Skeleton from "react-loading-skeleton";
import Spinner from "../UI/Spinner";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_ADDRESS } from "../../apollo/graphql/queries/userQueries";
import {
  APPLY_COUPON,
  PLACE_ORDER,
} from "../../apollo/graphql/mutations/userMutation";
import Order from "../../models/Order";
import { toast } from "react-toastify";
import { cartActions } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";

const Checkout = ({ cart }: { cart: CartItem[] }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>("");
  const dispatch = useDispatch();

  const [fetchAddresses, { loading, error, data }] = useLazyQuery<{
    getUserById: { addresses: Address[] };
  }>(GET_USER_ADDRESS);

  const addresses: Address[] = data?.getUserById.addresses || [];

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const [applyCoupon, { loading: isApplyingCoupon }] = useMutation<{
    validateCoupon: {
      couponCode: string;
      discountAmount: number;
      discountType: string;
      discountValue: number;
      message: string;
    };
  }>(APPLY_COUPON, {
    onError: (error) => {
      setCouponMessage(error.message);
      setDiscountAmount(0);
    },
    onCompleted: (data) => {
      if (data.validateCoupon) {
        setDiscountAmount(data.validateCoupon.discountAmount);
        setCouponMessage(
          data.validateCoupon.message || "Coupon applied successfully."
        );
      }
    },
  });

  useEffect(() => {
    if (error) {
      errorToasting(error);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && addresses.length > 0) {
      const defaultIndex = addresses.findIndex(
        (address: Address) => address.isDefault === true
      );
      if (defaultIndex !== -1) {
        setSelectedAddressIndex(defaultIndex);
      }
    }
  }, [addresses, loading]);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
      0
    );
  }

  useEffect(() => {
    setCouponMessage("");
    setDiscountAmount(0);
  }, [cart]);

  const handleApplyCouponCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const couponCode = formData.get("coupon") as string;

    if (!couponCode) {
      setCouponMessage("Please enter a valid coupon code.");
      return;
    }

    await applyCoupon({
      variables: {
        couponCode,
        orderTotal: total,
      },
    });
  };

  const [makeOrder, { loading: isMakingOrder }] = useMutation<{
    makeOrder: { message: string };
  }>(PLACE_ORDER, {
    onCompleted: (data) => {
      dispatch(cartActions.clearCart());
      toast.success(data.makeOrder.message || "Order placed successfully");
    },
  });

  const handleOrderNow = async () => {
    if (selectedAddressIndex === -1 || !addresses[selectedAddressIndex]) {
      errorToasting(new Error("Please select a delivery address"));
      return;
    }

    const address: Address = addresses[selectedAddressIndex];
    const order: Order = {
      total,
      discount: discountAmount,
      netTotal: total - discountAmount,
      address: `${address.line1} ${address.line2}. ${address.city}, ${address.state} - ${address.pincode}`,
      products: cart,
    };

    await makeOrder({
      variables: {
        addressTitle: address.title,
        order,
      },
    });
  };

  return (
    <div className="col gap-1">
      {loading ? (
        <Addresses.Skeleton />
      ) : !error ? (
        <Addresses
          selectedAddressIndex={selectedAddressIndex}
          setSelectedAddressIndex={setSelectedAddressIndex}
          addresses={addresses}
          onAddressAdded={() => fetchAddresses()}
        />
      ) : null}
      <hr />
      <div>
        <CouponForm
          handleApplyCouponCode={handleApplyCouponCode}
          couponMessage={couponMessage}
          isApplyingCoupon={isApplyingCoupon}
        />
        <div>
          <hr />
          <div className="row justify-between py-half">
            <p>Total</p>
            {cart && cart.length !== 0 ? (
              <p className="text-primary">{`₹${total}`}</p>
            ) : (
              <Skeleton height={20} width={40} />
            )}
          </div>
          <div className="row justify-between py-half">
            <p>Discount</p>
            {cart && cart.length !== 0 ? (
              <p className="text-secondary">-&nbsp;{`₹${discountAmount}`}</p>
            ) : (
              <Skeleton height={20} width={40} />
            )}
          </div>
          <div className="row justify-between py-half">
            <p>Net Total</p>
            {cart && cart.length !== 0 ? (
              <p className="text-primary">{`₹${total - discountAmount}`}</p>
            ) : (
              <Skeleton height={20} width={40} />
            )}
          </div>
          <PrimaryButton
            classes="w-100 my-2"
            onClick={handleOrderNow}
            disabled={
              !cart?.length || selectedAddressIndex === -1 || isMakingOrder
            }>
            {isMakingOrder ? (
              <Spinner size="15px" color="#fff" borderThickness="2px" />
            ) : (
              "Order Now"
            )}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
