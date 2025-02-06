import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String, $email: String, $password: String) {
    register(name: $name, email: $email, password: $password) {
      accessToken
      user {
        id
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($email: String, $password: String) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
      }
    }
  }
`;

export const USER_LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($currentPassword: String, $newPassword: String) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID, $quantity: Int) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      cartItems {
        id
        quantity
        product {
          id
          title
          price
          imageUrl
          description
          details
          isVeg
          seasonalTag
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: ID, $quantity: Int) {
    removeFromCart(productId: $productId, quantity: $quantity) {
      id
      cartItems {
        id
        quantity
        product {
          id
          title
          price
          imageUrl
          description
          details
          isVeg
          seasonalTag
        }
      }
    }
  }
`;

export const APPLY_COUPON = gql`
  mutation applyCoupon($orderTotal: Int, $couponCode: String) {
    validateCoupon(orderTotal: $orderTotal, couponCode: $couponCode) {
      couponCode
      discountAmount
      discountType
      discountValue
      message
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation addAddress($address: AddressInput) {
    addAddress(address: $address) {
      message
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($addressTitle: String, $order: OrderInput) {
    makeOrder(addressTitle: $addressTitle, order: $order) {
      message
    }
  }
`;
