import { NextResponse } from "next/server"

export async function POST(req: Request){
    try {
        const body = await req.json()
    
        const { cartId, lineId, quantity } = body;

        if(!cartId || !lineId || !quantity) {
            console.log('Missing required fields:', { cartId, lineId, quantity });
            return NextResponse.json({ message: 'Missing required fields' }, {status: 400});
        }


        const query = `
          mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart {
                id
                lines(first: 10) {
                    edges {
                    node {
                        id
                        quantity
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
                variables: { 
                    cartId, 
                    lines: [{
                        id:lineId, 
                        quantity: quantity
                    }]
                 },
            }),
        });

        console.log(response)

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
        

    } catch(error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}