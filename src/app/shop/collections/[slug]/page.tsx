import React from 'react'
import client from '../../../../../utils/shopify-client/shopify-client'
import { fetchCategories } from '../../../../../utils/fetchCategories/fetchCategories';
import ProductGrid from '../../ProductGrid'
import ProductCategories from '../../productCategories'



export default async function Page({params}: {params: { slug: string }}){
   const {slug} = params

   
   try {
     const response = await client.request(collectionQuery, {variables: { handle:slug }})

  
     const collection = response.data.collectionByHandle
     console.log(collection)

     const collections = collection.products.edges.map((item:any)=> {
      return item
     })
     
     const allCategories = await fetchCategories();


     return (
      <section>
       <ProductCategories collections={allCategories}/>
       <main className="flex justify-center">
        <ProductGrid items={collections} isProductGrid={false}/>
       </main>
      </section>
     )
      

   } catch(error){
    console.error("Error fetching collection:", error)

    return <h1>Error fetching collection</h1>
    
   }
  
}


export async function generateStaticParams() {
    try {
      const response = await client.request(collectionParamQuery)
      const paths = response.data.collections.edges.map((item:any)=> ({
        slug: item.node.handle
      })) || []

      return paths;
      
    }catch(error){
      console.error('Error fetching collections data:', error)
      return [];
    }
}

const collectionParamQuery = `
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
    }
`


const collectionQuery = `
  query getCollectionsByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle

      products(first: 10, reverse: true) {

        edges {
          node {
            id
            handle
            title
            createdAt
            priceRange{
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }

          }
        }
      }
    }
  } 
`