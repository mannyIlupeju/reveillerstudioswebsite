import fetch from 'node-fetch'


import { NextResponse } from 'next/server';


export async function POST(req: Request){
  console.log("Incoming request method:", req.method)
  
  try {
      const body = await req.json();
    
      console.log(body)
    
      const {cartId} = body
      
      if(!cartId) {
        return
      }


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
              "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_PUBLIC}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { cartId },
            }),
        })

        if(!response.ok){
            const errorText = await response.text()
            console.error("Shopify API Error:", errorText);
            return NextResponse.json({error: "Failed to fetch cart data", details: errorText})
        }

        const data:any = await response.json()
        const CartData = data.data.cart

        if(!CartData){
            return NextResponse.json({error: "Cart not found"}, {status: 404})
        }
        console.log("Cart data:", data)
        

        return NextResponse.json({ success: true, cart: CartData}, {status: 200});
    } catch (error){
        console.error('Error fetching cart data:', error);
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}