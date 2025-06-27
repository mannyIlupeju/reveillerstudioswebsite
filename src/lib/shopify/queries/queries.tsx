export const productQuery = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      totalInventory
      handle

      collections(first:10) {
            edges {
              node {
                id
                title
              }
            }
          }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      descriptionHtml
      images(first:6) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first:10) {
        edges {
          node {
          id
          title
          sku
          quantityAvailable
          priceV2 {
          amount
          currencyCode
          
        }
        selectedOptions {
            name
            value
        } 
        }
      }
    }

  }
}
`;


export const paramQuery = `
query {
  products(first: 10) {
    edges {
      node {
        handle
      }
    }
  }
}
`;


export const collectionParamQuery = `
    query {
        collections(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    updatedAt
                }
                
            }
        }
    }
`





export const collectionQuery = `
  query getCollectionsByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle

      products(first: 20, reverse: true) {
        edges {
          node {
            id
            handle
            title
            createdAt
            priceRange{
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 10) {
            edges {
              node {
                quantityAvailable
                availableForSale
              }
            }
            }

          }
        }
      }
    }
  } 
`


export const recommendationQuery = `
  query getRecommendations($productId: ID!, $intent: ProductRecommendationIntent) {
    productRecommendations(productId: $productId, intent: $intent) {
      id
      title
      handle
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`