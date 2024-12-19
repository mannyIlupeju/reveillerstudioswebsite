import { createStorefrontApiClient} from '@shopify/storefront-api-client';


const client = createStorefrontApiClient({
  storeDomain: '1725d5-a3.myshopify.com',
  apiVersion: '2024-10',
  publicAccessToken: 'd1b71c12154e587456cfac85b54d2544',
});

export default client;