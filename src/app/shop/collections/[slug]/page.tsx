import React from 'react'
import client from '../../../../lib/shopify/shopify-client/shopify-client'
import { fetchCategories } from '../../../../../utils/fetchCategories/fetchCategories';
import ProductGrid from '../../ProductGrid'
import ProductCategories from '../../productCategories'
import { collectionQuery, collectionParamQuery } from '@/lib/shopify/queries/queries';



export default async function Page({params}: {params: { slug: string }}){
   const {slug} = params

   
   try {
     const response = await client.request(collectionQuery, {variables: { handle:slug }})
       
     const collection = response.data.collectionByHandle
     

     const collections = collection.products.edges.map((item:any)=> {
      return item
     })
     
     const allCategories = await fetchCategories();

     return (
        <main className="flex xl:flex-row flex-col gap-8 px-4">
          <aside className=" sticky xl:top-52 top-10 z-10 xl:w-48 xl:self-start">
            <ProductCategories collections={allCategories} />
          </aside>
          <section className="flex-1 p-8">
            <ProductGrid items={collections} isProductGrid={true} />
          </section>
        </main>
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

