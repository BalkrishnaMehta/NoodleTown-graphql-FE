import { gql } from "@apollo/client";

export const GET_SEARCH_RESULTS = gql`
  query searchData($query: String!, $city: String!) {
    searchItems(query: $query, city: $city) {
      item {
        ... on Restaurant {
          logo
          title
          averageOrderValue
          typicalGroupSize
        }
        ... on Category {
          name
          products {
            imageUrl
            title
            price
          }
        }
        ... on Product {
          imageUrl
          title
          price
        }
      }
      score
      type
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query getRestaurants($orderBy: OrderBy) {
    getRestaurants(orderBy: $orderBy) {
      id
      logo
      title
    }
  }
`;

export const GET_RESTAURANTS_BY_ATTRIBUTE = gql`
  query getRestaurants($serviceType: String, $cuisine: String) {
    getRestaurantsByAttribute(serviceType: $serviceType, cuisine: $cuisine) {
      id
      logo
      title
      address
      averageOrderValue
      tags
    }
  }
`;

export const GET_RESTAURANT_DETAILS = gql`
  query getRestaurantDetails($id: ID) {
    getRestaurantById(id: $id) {
      id
      coverImages
      logo
      title
      tags
      address
      shopTiming
      averageOrderValue
      typicalGroupSize
      menuImages
      categories {
        name
        products {
          id
          imageUrl
          title
          description
          price
        }
      }
    }
  }
`;
