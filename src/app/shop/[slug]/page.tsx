import React from 'react';
import client from '../../../../utils/shopify-client/shopify-client';
import Navigation from '@/components/Navigation/Navigation';
import { Metadata } from 'next';
import Image from 'next/image';



// Define the Page Component
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

 

  try {
    // Fetch product data using the slug
    const response = await client.request(productQuery, { variables: {handle: slug }});
    const product = response?.data?.productByHandle;
    // console.log(product)
    
    
    if (!product) {
      // Return a 404 page if product is not found
      return <h1>Product not found</h1>;
    }

    const imageUrl = product.images.edges.map((item:any)=> {
      const images = item.node
      return images
    })
  
    return (
        <main className="container-width w-screen p-4 mt-20 flex flex-row gap-5 justify-center overflow-x-scrollauto">
        {imageUrl.map((item:any) => {
          console.log(item)
          return (
            <div key={product.id} className="flex items-star max-h-screen">
            <Image
            src={item.originalSrc}
            alt="Product images"
            width={1000}
            height={1200}
            />
            </div>
          )
        })}
       </main>
        
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

// export async function getStaticProps({params} : {params: {slug: string}}){
//   try {
//     const response = await client.request(productQuery, {variables: {handle: params.slug}})
//     console.log(response)

//   }catch(error){
//     console.error("Error")
//   }
// }

// Queries
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
    descriptionHtml
    handle
     images(first:65) {
      edges {
        node {
          originalSrc
          altText
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
     
   
     
 
   
  }
}
`;
