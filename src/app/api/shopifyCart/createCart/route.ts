import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("Incoming request method:", req.method);

  try {
    const body = await req.json();

    // ✅ Accept new lines payload or fallback to legacy
    const { lines } = body;
    let lineItems;

    if (lines && Array.isArray(lines)) {
      lineItems = lines;
    } else if (body.variants && body.quantity) {
      lineItems = [{
        merchandiseId: body.variants,
        quantity: body.quantity,
      }];
    } else {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Detect country from IP headers
    const countryHeader = req.headers.get('x-vercel-ip-country');
    const country = countryHeader === 'CA' ? 'CA' : 'US';

    console.log("Creating cart with country:", country);

    // ✅ Add @inContext(country: $country)
    const query = `
      mutation createCart($lines: [CartLineInput!]!, $country: CountryCode)
      @inContext(country: $country) {
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

    const response = await fetch(
      `https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_PUBLIC}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            lines: lineItems,
            country,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newData = await response.json();

    if (newData.data?.cartCreate?.userErrors?.length > 0) {
      console.error("Shopify User Errors:", newData.data.cartCreate.userErrors);
      return NextResponse.json({
        error: "Shopify API Error",
        details: newData.data.cartCreate.userErrors,
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, cart: newData.data.cartCreate.cart });
  } catch (error: any) {
    console.error("Error creating cart:", error);
    return NextResponse.json({
      error: "Error creating cart",
      details: error.message || "Unexpected server error",
    }, { status: 500 });
  }
}
