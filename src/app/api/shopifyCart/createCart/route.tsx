import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("Incoming request method:", req.method);

    try {
        const body = await req.json();
        

        const { variants, quantity } = body;

        if (!variants || !quantity) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Ensure variants is a string (single ID)
        if (typeof variants !== "string") {
            return NextResponse.json({ error: "Invalid variant ID format" }, { status: 400 });
        }

        const lineItems = [{ merchandiseId: variants, quantity }];

        const query = `
            mutation createCart($lines: [CartLineInput!]!) {
                cartCreate(input: { lines: $lines }) {
                    cart {
                        id
                        checkoutUrl
                        lines(first: 10) {
                            edges {
                                node {
                                    id
                                    merchandise {
                                        ... on ProductVariant {
                                            id
                                        }
                                    }
                                }
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
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_PUBLIC}`,
            },
            body: JSON.stringify({
                query,
                variables: { lines: lineItems },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = await response.json();
   

        // Check for user errors
        if (newData.data?.cartCreate?.userErrors.length) {
            console.error("Shopify User Errors:", newData.data.cartCreate.userErrors);
            return NextResponse.json({
                error: "Shopify API Error",
                details: newData.data.cartCreate.userErrors
            }, { status: 400 });
        }

        return NextResponse.json({ success: true, cart: newData.data.cartCreate.cart });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Error creating cart", details: error.message }, { status: 500 });
    }
}