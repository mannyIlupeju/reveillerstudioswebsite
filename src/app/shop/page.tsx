//main Shop Page display

import React from 'react'
import type {Metadata} from 'next'
import { fetchProducts } from '../../../utils/fetchProducts/fetchProducts'
import { fetchCategories } from '../../../utils/fetchCategories/fetchCategories'
import ProductGrid from './ProductGrid'
import ProductCategories from './productCategories'
import {cookies, headers} from 'next/headers'





export const metadata: Metadata = {
  title: 'Shop page'
}


const Page = async () => {
  // ✅ MUST be called directly in the server component
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookie = cookieStore.get('user-country')?.value;
  const headerCountry = headerStore.get('x-vercel-ip-country');

  const country = cookie === 'CA' || headerCountry === 'CA' ? 'CA' : 'US'
  console.log('Country:', country);

  const products = await fetchProducts(country) // pass country
  const collections = await fetchCategories()

  return (
    <main className="flex xl:flex-row flex-col gap-8 px-4">
      <aside className="xl:sticky block xl:top-52 top-10 z-10 xl:w-48 xl:self-start">
        <ProductCategories collections={collections} />
      </aside>
      <section className="flex-1 p-8">
        <ProductGrid items={products} isProductGrid={false} />
      </section>
    </main>
  )
}

export const revalidate = 60;

export default Page;