import React from 'react'
import { cookies } from 'next/headers'
import CartDisplay from '../../components/CartDisplay/cartDisplay'
import Link from 'next/link'



export default async function Cart() {

  const cookieStore = await cookies(); 
  const cartId = cookieStore.get('cartId')?.value;
  console.log(cartId)



if(!cartId){
  return (
    <main className="flex flex-col gap-8 justify-center items-center h-screen">
      <p>What are you doing?? Let's run it up! Add an item! 👀😉</p>
      <Link href="/shop">Continue Shopping</Link>   
    </main>
  )
}

try {
const query = `
            query cartQuery($cartId: ID!) {
              cart(id: $cartId) {
                id
                createdAt
                updatedAt
                checkoutUrl
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          image {
                            src
                            altText
                          }
                          priceV2 {
                            amount
                            currencyCode
                          }
                          product {
                            vendor
                            title
                            handle
                          }
                        }
                      }
                      attributes {
                        key
                        value
                      }
                    }
                  }
                }
                attributes {
                  key
                  value
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                  totalDutyAmount {
                    amount
                    currencyCode
                  }
                }
                buyerIdentity {
                  email
                  phone
                  customer {
                    id
                  }
                  countryCode
                }
              }
            }
        `;

        const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_PUBLIC!,
          },
          body: JSON.stringify({
              query,
              variables: { cartId },
          }),
        })
        
        if(!response.ok){
            throw new Error("Failed to fetch cart")
        }

        const data:any  = await response.json();
      
        const cart = data.data.cart

        if (!cart) {
          return <p>Cart is empty.</p>;
        }

        
        return (
           <CartDisplay cart={cart}/>
        )

 
  }catch(error){
    console.error('Error fetching cart:', error);
    return <p>Error loading cart.</p>;
  }
}

