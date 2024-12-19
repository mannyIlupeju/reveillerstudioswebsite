import client from "../shopify-client/shopify-client"

export const fetchCategories = async () => {
    const categoryQuery = `
    query {
        collections(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    updatedAt
                }
                
            }
        }
    }`

    const {data,errors} = await client.request(categoryQuery)
    
    if (errors){
        console.error("Error fetching categories from shopify")
    }

    return data.collections.edges
}

