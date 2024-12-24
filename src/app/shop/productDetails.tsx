'use client'

import React, { Component, useState, useEffect} from 'react'
import Image from 'next/image'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    slidesToScroll: 4,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear"
  };




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
       
          <main className="mt-10 slider-container">
                
                  <Slider {...settings}>
                  {imageUrl.map((item:any, index:any) => {
                    return (
                      <div key={index}
                      >
                        <Image
                        src={item.originalSrc}
                        alt="Product images"
                        width={800}
                        height={800}
                        />

                      </div>
                      
                    )
                  })}

                </Slider>
          </main>
      </section>
  )
}

export default ProductDetails