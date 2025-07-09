'use client'
import React, {useState} from "react"
import Link from 'next/link'
import Image from 'next/image'


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

type ProductNode = {
  node: Item;
}

type Props = {
  items: Item[],
  isProductGrid?: boolean;
}




export default function ProductGrid({items, isProductGrid = true}:Props) {
  


  const sortedProduct = items.map(x => x.node).map(product => ({...product, totalQuantity: product.variants.edges.reduce((sum, variant) => {
      return sum + (variant.node.quantityAvailable || 0)
    },0)
  })).sort((a, b)=> {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if(dateA === dateB){
      return b.totalQuantity - a.totalQuantity;
    }

    return dateB - dateA
  })

  console.log(sortedProduct)  


  

  const [isImageHovered, setIsImageHovered] = useState<string | (null)>(null)

   const handleMouseEnter = (_id:any) => {
    setIsImageHovered(_id);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(null);
  };
  
  return (

    <div className="grid grid-cols-1 2xl:grid-cols-3 md:grid-cols-2 gap-x-12 gap-y-12 ps-8">
        {sortedProduct?.map((item:any) => {
         console.log(item.handle)

          const id = item.id
          const _id = id?.match(/\d+/g).join('') || id;
          console.log(id)
          

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
                className="relative w-full aspect-[3/4]"
              >
                {item.images.edges[0] && (
                  <Image
                    src={isImageHovered === _id ? item.images.edges[1]?.node.originalSrc :item.images.edges[0]?.node.originalSrc}
                    fill
                    alt="Product Image"
                    className={`transform transition hover:scale-105 optimized ${!item.variants?.edges[0]?.node.availableForSale ? 'opacity-50' : ''}`}
                    loading='lazy'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                {/* Overlay if not available */}
                {!item.variants?.edges[0]?.node.availableForSale && (
                  <div className="absolute bg-black p-4 bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold">
                    Sold Out
                  </div>
                )}
              </div>



              <div className="text-center xl:text-lg text-xs font-satoshi flex flex-col justify-center gap-2 font-light -mt-4 productTitleBox w-full p-2">
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
