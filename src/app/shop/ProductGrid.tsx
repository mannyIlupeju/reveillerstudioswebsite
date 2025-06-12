'use client'
import React, {useState} from "react"
import Link from 'next/link'
import Image from 'next/image'
import Navigation from "@/components/Navigation/Navigation"

type Item = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml?: string;
  images: {
    edges: Array<{
      node: {
        originalSrc: string;
        altText: string;
      };
    }>;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type Props = {
  items: Item[],
  isProductGrid?: boolean;
}




export default function ProductGrid({items, isProductGrid = true}:Props) {

  //filtering the values from the product object and collections object
  const itemMaps = items.flatMap((item:any)=>{
    return item
  })
  

  const [isImageHovered, setIsImageHovered] = useState<string | (null)>(null)

   const handleMouseEnter = (_id:any) => {
    setIsImageHovered(_id);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(null);
  };
  
  return (

    <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-x-12 gap-y-12 ps-8">
        {itemMaps?.map((values:any) => {
         const item = values.node
    
          const id = item.id
          const _id = id?.match(/\d+/g).join('') || id;
          

          return (
            <Link href={`/shop/allProducts/${item.handle}`} key={_id}>
              <div 
                key={item.id} 
                onMouseEnter={()=> handleMouseEnter(_id)} 
                onMouseLeave={handleMouseLeave} 
                className="flex items-center justify-center"
              >
                {item.images.edges[0] && (
                  <Image
                    src={isImageHovered === _id ? item.images.edges[1]?.node.originalSrc :item.images.edges[0]?.node.originalSrc}
                    width={500}
                    height={500}
                    alt="Product Image"
                    className="transform transition hover:scale-105 optimized"
                    loading='lazy'
                  />
                )}
              </div>

              <div className="text-center flex justify-center gap-8 font-bold -mt-4 productTitleBox w-full p-2">
                <h1>{item.title}</h1>
                <span>${item.priceRange.minVariantPrice.amount}</span>
              </div>

            </Link>
          )

          
        })
        }
        </div>
        
  )
}
