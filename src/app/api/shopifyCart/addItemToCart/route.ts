import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartId, merchandiseId, quantity, size } = body;

    if (!cartId || !merchandiseId || !quantity || !size) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lineItems = [
      {
        merchandiseId,
        quantity,
        attributes: [{ key: 'Size', value: size.value }],
      },
    ];

    const country = 'US'; // Hardcoded for now to eliminate variability

    const query = `
      mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode)
      @inContext(country: $country) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',            
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_PUBLIC as string,
        },
        body: JSON.stringify({
          query,
          variables: { cartId, lines: lineItems, country },
        }),
      }
    );

    const data = await response.json();
    console.log('Shopify response:', JSON.stringify(data, null, 2));

    const result = data.data?.cartLinesAdd;

    if (!result) {
      return NextResponse.json({ error: 'No cartLinesAdd result' }, { status: 500 });
    }

    if (result.userErrors?.length) {
      return NextResponse.json(
        { error: 'Shopify user error', details: result.userErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, cart: result.cart });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
