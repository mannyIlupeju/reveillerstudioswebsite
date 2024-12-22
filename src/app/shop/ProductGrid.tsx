'use client'
import React, {useState} from "react"
import Link from 'next/link'
import Image from 'next/image'

type Product = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    edges: Array<{
      node: {
        originalSrc: string;
        altText: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type Props = {
  products: Product[];
}




export default function ProductGrid({products}:Props) {

  const [isImageHovered, setIsImageHovered] = useState(null)

   const handleMouseEnter = (_id:any) => {
    setIsImageHovered(_id);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(null);
  };
  
  return (
         <div className="grid items-center justify-center p-24 grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-x-12 gap-y-12">
        {products.map((item:any) => {
          const product = item.node;
        
          const id = product.id
          const _id = id.match(/\d+/g).join('');

          return (
            <Link href={`/shop/${product.handle}`} key={_id}>
              <div key={product.id} onMouseEnter={()=> handleMouseEnter(_id)} onMouseLeave={handleMouseLeave}>
                {product.images.edges[0] && (
                  <Image
                    src={isImageHovered === _id ? product.images.edges[1]?.node.originalSrc :product.images.edges[0]?.node.originalSrc}
                    width={450}
                    height={450}
                    alt="Product Image"
                    className="flex items-center justify-center transform transition hover:scale-105 "
                    loading='lazy'
                  />
                )}
              </div>

              <div className="text-center font-bold mt-8">
                <h1>{product.title}</h1>
                <span>{product.priceRange.minVariantPrice.amount}</span>
              </div>

            </Link>
          )
        })}
        </div>
  )
}
