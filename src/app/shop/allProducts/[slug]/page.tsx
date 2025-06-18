import React from 'react';
import ProductDetails from '../../productDetails';
import { fetchCategories } from '../../../../../utils/fetchCategories/fetchCategories';
import client from '../../../../lib/shopify/shopify-client/shopify-client';
import { paramQuery, productQuery } from '@/lib/shopify/queries/queries';
import { getProductRecommendations } from '../../prodRecommendations';
import { Metadata } from 'next';




// Define the Page Component

export default async function Page({ params }: { params: { slug: string } }): Promise<JSX.Element> {    

  try {
    // Fetch product data using the slug
    const {slug} =  await params;
    const response = await client.request(productQuery, { variables: {handle: slug }});
    const product = response?.data?.productByHandle;
    const recommendations = await getProductRecommendations(product.id)
    
    
    if (!product) {
      return <h1>Product not found</h1>;
    }



    return (
      <ProductDetails products={product} recommendations={recommendations}/>
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



