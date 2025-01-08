'use client'

import React, {useState} from 'react'
import Link from 'next/link'


type Collection = {
  id: string;
  title: string;
  handle: string;
  updatedAt: string;
}

type Props = {
    collections: Collection[]
}


function ProductCategories({ collections }: Props) {
  return (
      <aside className="xl:absolute xl:translate-y-64 lg:p-4">
        <div className = "flex xl:flex-col justify-center mt-12 flex-row gap-5">
        {collections.map((item:any) => {
            const collection = item.node

            return (
                <Link 
                key={collection.id} 
                href={`/shop/collections/${collection.handle}`} 
                className= "hover:text-yellow-600 text-zinc-800 cursor-pointer"
                >
                  <p className="font-semibold">{collection.title.toUpperCase()}</p>
                </Link>
            )
        })}
        </div>
      </aside>
  )
}


export default ProductCategories