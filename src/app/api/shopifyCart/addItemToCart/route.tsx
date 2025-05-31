import fetch from 'node-fetch';

import { NextResponse } from 'next/server'



export  async function POST(req: Request) {
    console.log("Incoming request method:", req.method)

        try {
            const body = await req.json()
            console.log(body)
            const {cartId, merchandiseId, quantity, size} = body
            console.log(size)

             if (!cartId || !merchandiseId || !quantity) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
            }

            const lineItems = [{merchandiseId, quantity, attributes: [{key: "Size", value: size.value}]}]

            console.log(cartId, lineItems)


            const query = `
                mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
                    cartLinesAdd(cartId: $cartId, lines: $lines) {
                        cart {
                            id
                            lines(first: 10) {
                                edges {
                                    node {
                                        id
                                        attributes { 
                                            key
                                            value
                                        }
                                        merchandise {
                                            ... on ProductVariant {
                                                id
                                            }
                                        }
                                    }
                                }
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
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }
            `;

            const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
                method: "POST",
                headers: {
                    'X-Shopify-Storefront-Access-Token': `${process.env.SHOPIFY_PUBLIC}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: { cartId, lines: lineItems }
                })
            })

            
            
            const data:any = await response.json();
            console.log("Shopify API response:", JSON.stringify(data, null, 2))
    

            // Check if cartLinesAdd is available and has userErrors
        
            if (data.data?.cartLinesAdd?.userErrors.length > 0) {
                console.error('User errors:', data.data.cartLinesAdd.userErrors);
                return NextResponse.json({error: "Shopify error", details: data.data.cartLinesAdd.userErrors }, { status: 400 })
            }
            
            return NextResponse.json({ success: true, cart: data.data.cartLinesAdd.cart });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Error adding items to cart' })
        }
    
}