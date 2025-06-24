import { NextResponse } from "next/server";


export async function POST(req: Request){
     console.log("Incoming request method:", req.method);
     
    try {
        const body = await req.json()
    
        const {cartId, lineId} = body

        if(!cartId || !lineId) {
            return
        }

        const query = `
            mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
                cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                    cart {
                    id
                    lines(first: 10){
                        edges
                        {
                        node{
                            quantity
                            merchandise{
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
        `
        const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_PUBLIC}`,
            },
            body: JSON.stringify({
                query,
                variables: { cartId, lineIds: [lineId] },
            }),
        });



        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()

         if (data.errors) {
            return NextResponse.json(
                { error: data.errors[0].message },
                { status: 400 }
            )
        }

        return NextResponse.json(data)
        
    } catch(error){
        console.error("Error getting cart:", error)
        return NextResponse.json(
            { error: "Failed to remove item from cart" },
            { status: 500 }
        )
    }
}