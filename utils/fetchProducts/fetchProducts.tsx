import client from "../../src/lib/shopify/shopify-client/shopify-client"

export const fetchProducts = async () => {
    const productQuery = `
    query {
        products(first: 10) {
        edges {
            node {
            id
            title
            handle
            options {
                name
                values
            }
            descriptionHtml 
            images(first:6) {
                edges {
                node {
                    originalSrc
                    altText
                }
                }
            }
            priceRange {
                minVariantPrice {
                amount
                currencyCode
                }
            }
            }
        }
        }
    }`

    const {data,errors} = await client.request(productQuery)
    
    if (errors){
        console.error("Error fetching data from shopify")
    }

    console.log(data)
    return data?.products.edges
}

