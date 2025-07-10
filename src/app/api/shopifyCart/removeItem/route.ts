import { NextResponse } from "next/server";
import shopifyFetch from '../../../../../utils/ShopifyFetchUtils/shopifyFetchUtils';

export async function POST(req: Request) {
  console.log("=== REMOVE ITEM API ROUTE ===");

  try {
    const body = await req.json();
    const { cartId, lineId } = body;

    console.log("Received cartId:", cartId);
    console.log("Received lineId:", lineId);

    if (!cartId || !lineId) {
      return NextResponse.json(
        { error: "Missing cartId or lineId" },
        { status: 400 }
      );
    }

    const country = req.headers.get('x-vercel-ip-country') || 'US';

    const query = `
      mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!) @inContext(country: $country) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
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
              totalAmount { amount currencyCode }
              subtotalAmount { amount currencyCode }
              totalTaxAmount { amount currencyCode }
              totalDutyAmount { amount currencyCode }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await shopifyFetch(query, {
      cartId,
      lineIds: [lineId],
      country,
    });

    console.log("Shopify API response:", data);

    const userErrors = data?.cartLinesRemove?.userErrors;
    if (userErrors?.length > 0) {
      console.warn("Shopify user errors:", userErrors);
      return NextResponse.json(
        { error: "Shopify user error", details: userErrors },
        { status: 400 }
      );
    }

    const cart = data?.cartLinesRemove?.cart;
    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found after item removal" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, cart });
  } catch (error: any) {
    console.error("Unexpected error removing item from cart:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
