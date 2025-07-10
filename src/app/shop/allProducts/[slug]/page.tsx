import React from 'react';
import ProductDetails from '../../productDetails';
import client from '../../../../lib/shopify/shopify-client/shopify-client';
import { paramQuery, productQuery } from '@/lib/shopify/queries/queries';
import { getProductRecommendations } from '../../prodRecommendations';
import { cookies, headers } from 'next/headers';

type PageProps = {
  params: {
    slug: string;
  };
};

// Define the Page Component

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = params;

  try {
    // Fetch product data using the slug
    const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
    const cookie = cookieStore.get('user-country')?.value;
    const headerCountry = headerStore.get('x-vercel-ip-country');

    const country = (cookie === 'CA' || headerCountry === 'CA') ? 'CA' : 'US';
    console.log('Country:', country);

    const response = await client.request(productQuery, { variables: { handle: slug, country } });
    const product = response?.data?.productByHandle;

    if (!product) {
      return <h1>Product not found</h1>;
    }

    const recommendations = await getProductRecommendations(product.id, country);

    return (
      <ProductDetails products={product} recommendations={recommendations} />
    );
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



