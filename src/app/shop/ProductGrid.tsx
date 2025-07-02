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
  console.log(items)
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

    <div className="grid grid-cols-1 2xl:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-12 ps-8">
        {itemMaps?.map((values:any) => {
         const item = values.node
    
         console.log(item)
          const id = item.id
          const _id = id?.match(/\d+/g).join('') || id;
          

          return (
            <Link href={`/shop/allProducts/${item.handle}`} key={_id}>
              <div 
                key={item.id} 
                onMouseEnter={()=> handleMouseEnter(_id)} 
                onMouseLeave={handleMouseLeave} 
                onTouchStart={() => handleMouseEnter(_id)}
                onTouchEnd={handleMouseLeave}
                onClick={() => {
                  // Optional: toggle on tap for mobile
                  if (window.innerWidth <= 768) {
                    if (isImageHovered === _id) setIsImageHovered(null);
                    else setIsImageHovered(_id);
                  }
                }}
                className="relative w-full aspect-[4/5]"
              >
                {item.images.edges[0] && (
                  <Image
                    src={isImageHovered === _id ? item.images.edges[1]?.node.originalSrc :item.images.edges[0]?.node.originalSrc}
                    fill
                    alt="Product Image"
                    className={`transform transition hover:scale-105 optimized ${!item.variants?.edges[0]?.node.availableForSale ? 'opacity-50' : ''}`}
                    loading='lazy'
                  />
                )}

                {/* Overlay if not available */}
                {!item.variants?.edges[0]?.node.availableForSale && (
                  <div className="absolute bg-black p-4 bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold">
                    Sold Out
                  </div>
                )}
              </div>



              <div className="text-center xl:text-lg text-xs flex flex-col justify-center gap-2 font-bold -mt-4 productTitleBox w-full p-2">
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
