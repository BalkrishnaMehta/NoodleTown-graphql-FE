import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUserById {
      id
      name
      email
    }
  }
`;

export const GET_USER_ADDRESS = gql`
  query getUser {
    getUserById {
      addresses {
        id
        title
        line1
        line2
        city
        state
        pincode
        isDefault
        isLastUsed
      }
    }
  }
`;

export const GET_USER_CART = gql`
  query getUser {
    getUserById {
      cart {
        cartItems {
          id
          product {
            id
            imageUrl
            title
            price
            description
          }
          quantity
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query getUser {
    getUserById {
      orders {
        id
        netTotal
        products
        status
        createdAt
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query getOrder($id: ID) {
    getOrderDetails(id: $id) {
      id
      total
      discount
      netTotal
      address
      products
      status
      createdAt
    }
  }
`;
