'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";



const ProductDetails = ({products}:any) => {
  console.log(products)
  const [currentIndex, setCurrentIndex] = useState(0)

  const mainImageUrl = products.images.edges[currentIndex].node.originalSrc
  console.log(products.images.edges.length)
  const imageLength = products.images.edges
  console.log(imageLength.length)
  console.log(mainImageUrl)



  const imageUrl = products.images.edges.map((item:any)=> {
    const images = item.node
    return images
  })

 

// useEffect(() => {
//   const interval = setInterval(() => {
//     let lastSlide = currentIndex === products.images.edges.length - 1;
//     const nextSlide = lastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(nextSlide);
//   }, 1000);

//   return () => clearInterval(interval); // Cleanup on unmount
// }, [currentIndex, products.images.edges.length]);


  function prevImage(e:any){
    e.preventDefault()
    let firstSlide =  currentIndex == 0
    const prevSlide = firstSlide ? products.images.edges.length - 1 : currentIndex - 1
    console.log('clicked back arrow')
    // setCurrentIndex(prevSlide)
  }

  function nextImage(e:any){
    e.preventDefault()
    let lastSlide = currentIndex == products.images.edges.length -1 
    const nextSlide = lastSlide ? 0 : currentIndex + 1
    console.log('clicked next arrow')
    // setCurrentIndex(nextSlide)
  }


  return (
      <section>
          <aside className="bg-gray-100 p-3 ml-4 text-xl font-bold rounded-lg w-fit -mt-3">
            <div className="flex flex-row gap-10">
            <span className="">{products.title}</span>
            <span>${products.priceRange.minVariantPrice.amount}</span>
            </div>

            <div>

            </div>
            
          </aside>
       
          <main className="relative block top-0 bottom-0 right-3 mt-10">
              <div className="relative">
                <div className="flex justify-start flex-nowrap gap-10">
                  {imageUrl.map((item:any, index:any) => {
                    return (
                      <div key={index} className={`${index === imageLength.length-1 ? "lastItem" : ""} ${currentIndex === index ? 'activeImage' : ''} w-screen`}
                      >
                        <Image
                        src={item.originalSrc}
                        alt="Product images"
                        width={1200}
                        height={1200}
                        />

                      </div>
                      
                    )
                  })}
                  <FaChevronLeft 
                  className="absolute left-10 translate-y-1/2 top-5" 
                  size={20}
                  onClick={prevImage}
                  
                  />
                  <FaChevronRight 
                  className="absolute right-10 translate-y-1/2 top-5" 
                  size={20}
                  onClick={nextImage}
                  />

                </div>
              </div>
          </main>
      </section>
  )
}

export default ProductDetails