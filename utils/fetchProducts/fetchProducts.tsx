import client from "../shopify-client/shopify-client"

export const fetchProducts = async () => {
    const productQuery = `
    query {
        products(first: 10) {
        edges {
            node {
            id
            title
            handle
            descriptionHtml 
            images(first: 4) {
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

    return data.products.edges
}

