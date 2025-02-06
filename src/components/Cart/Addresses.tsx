import { useRef } from "react";
import { PrimaryButton } from "../UI/Button";
import Modal, { ModalHandle } from "../UI/Modal";
import Address from "../../models/Address";
import styles from "../../styles/Cart/Addresses.module.css";
import AddressForm from "../forms/AddressForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Addresses = ({
  selectedAddressIndex,
  setSelectedAddressIndex,
  addresses,
  onAddressAdded,
}: {
  selectedAddressIndex: number;
  setSelectedAddressIndex: (selectedAddressIndex: number) => void;
  addresses: Address[];
  onAddressAdded: () => void;
}) => {
  const modal = useRef<ModalHandle>(null);

  return (
    <>
      <Modal ref={modal}>
        <AddressForm
          closeModal={() => {
            modal.current?.close();
            onAddressAdded();
          }}
        />
      </Modal>
      <PrimaryButton
        onClick={() => {
          modal.current?.open();
        }}>
        Add new address
      </PrimaryButton>
      <div>
        {addresses.map((address: Address, index: number) => {
          const isSelected = index === selectedAddressIndex;
          return (
            <div
              className={`col ${styles.address_selection} ${
                isSelected ? styles.selected_address : ""
              }`}
              onClick={() => {
                setSelectedAddressIndex(index);
              }}
              key={`address${index}`}>
              <div className="row justify-between align-center">
                <div className="row gap-half align-center">
                  <input
                    type="radio"
                    name="address"
                    id={`address${index}`}
                    value={`address${index}`}
                    checked={isSelected}
                    className={styles.radio}
                    onChange={() => setSelectedAddressIndex(index)}
                  />
                  {address.isDefault && (
                    <span className={styles.default_badge}>Default</span>
                  )}
                  {address.isLastUsed && (
                    <span className={styles.last_used_badge}>Last used</span>
                  )}
                </div>
                <h4>{address.title}</h4>
              </div>
              {isSelected && (
                <div className={`col ${styles.address_content}`}>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <div className="row">
                    <p>{address.city},&ensp;</p>
                    <p>{address.state}&ensp;-&ensp;</p>
                    <p>{address.pincode}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

Addresses.Skeleton = () => (
  <>
    <Skeleton width="100%" height={36} borderRadius={3.2} />
    <div>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div className={styles.address_selection} key={index}>
            <div className="row justify-between align-center">
              <div className="row gap-half align-center">
                <Skeleton circle height={15} width={15} />
                {index === 2 && <Skeleton height={12} width={50} />}
              </div>
              <Skeleton height={20} width={100} />
            </div>
            {index === 2 && (
              <div className={`col ${styles.address_content}`}>
                <Skeleton count={3} height={16} width="100%" />
              </div>
            )}
          </div>
        ))}
    </div>
  </>
);

export default Addresses;
