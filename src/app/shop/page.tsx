//main Shop Page display

import React from 'react'
import type {Metadata} from 'next'
import { fetchProducts } from '../../../utils/fetchProducts/fetchProducts'
import { fetchCategories } from '../../../utils/fetchCategories/fetchCategories'
<<<<<<< HEAD
import Navigation from '@/components/Navigation/Navigation'
=======
>>>>>>> origin/main
import Footer from '@/components/Footer/Footer'
import ProductGrid from './ProductGrid'
import ProductCategories from './productCategories'


<<<<<<< HEAD
=======




>>>>>>> origin/main
export const metadata: Metadata = {
  title: 'Shop page'
}

const Page = async () => {  
  const products = await fetchProducts();
  const collections = await fetchCategories();
  

  return (
    <section className="">
      <ProductCategories collections={collections}/>
      <main className="flex justify-center">
       <ProductGrid items={products} isProductGrid={true} />
      </main>
      <Footer/>
    </section>
  )
}

export const revalidate = 60;

export default Page;