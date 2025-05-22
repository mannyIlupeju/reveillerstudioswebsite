//main Shop Page display

import React from 'react'
import type {Metadata} from 'next'
import { fetchProducts } from '../../../utils/fetchProducts/fetchProducts'
import { fetchCategories } from '../../../utils/fetchCategories/fetchCategories'
import Footer from '@/components/Footer/Footer'
import ProductGrid from './ProductGrid'
import ProductCategories from './productCategories'






export const metadata: Metadata = {
  title: 'Shop page'
}

const Page = async () => {  
  const products = await fetchProducts();
  const collections = await fetchCategories();
  

  return (
    <section className="">
      <ProductCategories collections={collections}/>
      <main className="flex justify-end p-4 mb-24">
       <ProductGrid items={products} isProductGrid={true} />
      </main>
    </section>
  )
}

export const revalidate = 60;

export default Page;