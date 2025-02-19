import React from 'react';
import ProductDetails from '../../productDetails';
import { fetchCategories } from '../../../../../utils/fetchCategories/fetchCategories';
import client from '../../../../../utils/shopify-client/shopify-client';
import { Metadata } from 'next';




// Define the Page Component

export default async function Page({ params }: { params: { slug: string } }): Promise<JSX.Element> {    

  try {
    // Fetch product data using the slug
    const {slug} = params;
    const response = await client.request(productQuery, { variables: {handle: slug }});
    const product = response?.data?.productByHandle;
    
    
    if (!product) {
      return <h1>Product not found</h1>;
    }

    return (
      <ProductDetails products={product}/>
    )
  } catch (error) {
    console.error("Error fetching product data:", error);
    return <h1>Error loading product</h1>;
  }
}



// Generate Static Params for Dynamic Routes
export async function generateStaticParams() {
  try {
    // Fetch a list of products to generate paths
    const response = await client.request(paramQuery);
    const paths = response.data.products.edges.map((edge: any) => ({
      slug: edge.node.handle,
    })) || [];

    return paths;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}


const paramQuery = `
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

const productQuery = `
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
          priceV2 {
          amount
          currencyCode
        }
        availableForSale
        selectedOptions {
            name
            value
        }
        quantityAvailable        
        }
      }
    }

  }
}
`;
