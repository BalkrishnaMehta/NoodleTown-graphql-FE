import { gql } from "@apollo/client";

export const GET_POPULAR_RECIPIES = gql`
  query categoriesWithMostProducts {
    getPopularCategories {
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
`;

export const GET_SEASONAL_PRODUCTS = gql`
  query getProductsBySeason {
    getSeasonalProducts {
      id
      imageUrl
      title
      seasonalTag
    }
  }
`;

export const GET_CATEGORIZED_PRODUCTS = gql`
  query getProductsByCategory($category: String!, $page: Int!) {
    getProductsByCategory(category: $category, page: $page) {
      limit
      page
      totalPages
      totalRecords
      results {
        imageUrl
        title
        price
        isVeg
        description
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      id
      imageUrl
      title
      description
      details
      price
    }
  }
`;
