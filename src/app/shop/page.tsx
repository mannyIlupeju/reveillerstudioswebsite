
import React from 'react'
import type {Metadata} from 'next'
import { fetchProducts } from '../../../utils/fetchProducts/fetchProducts'
import { fetchCategories } from '../../../utils/fetchCategories/fetchCategories'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import ProductGrid from './ProductGrid'
import ProductCategories from './product-categories'


export const metadata: Metadata = {
  title: 'Shop page'
}

const Page = async () => {  
  const products = await fetchProducts();
  const collections = await fetchCategories();

  return (
    <section className="">
      <Navigation/>
      <ProductCategories collections={collections}/>

      <main className="flex justify-center">
       <ProductGrid products={products}/>
      </main>
      <Footer/>
    </section>
  )
}

export const revalidate = 60;

export default Page;