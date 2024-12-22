import React, {useState} from 'react'
import Image from 'next/image'


const ProductDetails = ({products, images}:any) => {
  console.log(products, images)
  return (
      <section>
       <main className="w-screen overflow-hidden p-1 mt-20 ">
          <div className="flex flex-row gap-5 justify-center w-fit">
            {images.map((item:any) => {
              return (
                <div key={products.id} className="flex items-center w-full justify-center pd-animation"
                >
                  <Image
                  src={item.originalSrc}
                  alt="Product images"
                  width={600}
                  height={800}
                  />
                </div>
              )
            })}
        </div>
       </main>
      </section>
  )
}

export default ProductDetails