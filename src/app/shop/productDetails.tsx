'use client'

import React, { Component } from 'react'
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DOMPurify from 'isomorphic-dompurify';



const ProductDetails = ({products}:any) => {
  console.log(products)
  const imageUrl = products.images.edges.map((item:any)=> {
    const images = item.node
    return images
  })
  

  const markUpText =  products.descriptionHtml

  const CleanMarkUp = ({markUpText}: {markUpText: string}) => {
    const sanitizeDescription = DOMPurify.sanitize(markUpText);
    return <div dangerouslySetInnerHTML={{__html: sanitizeDescription}} />
  }


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20rem",
    slidesToShow: 2,
    slidesToScroll: 1,
    speed:3000,
    autoplay:true,
    autoplaySpeed:2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          speed:2000,
          autoplay:true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          speed:2000,
          autoplay:true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed:2000,
          autoplay:true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }
      }
    ]
    
  };




  return (
      <section className="relative">
          <aside className="absolute z-10 p-3 ml-4 flex flex-col gap-5 font-bold -mt-3">
            <div className="bg-gray-100 p-3 text-xl flex flex-row gap-10 w-fit rounded-lg border-black">
              <span className="">{products.title}</span>
              <span>${products.priceRange.minVariantPrice.amount}</span>
            </div>

            <div className="flex flex-row gap-8">
              <select className="bg-gray-100 w-fit text-md p-2 rounded-lg">
              {products.variants.edges.map((item:any, index:any)=>{
                const prices = item.node
                return (
                  <option key={index} value={prices.selectedOptions[1].value}>{prices.selectedOptions[1].value} / {prices.selectedOptions[0].value} </option>
                  )
                  
                })}
              </select> 

              <button className="bg-gray-300 p-4 rounded-lg">Add to Cart</button>
            </div>

            <div className="bg-gray-100 p-2 rounded-lg">
              <CleanMarkUp markUpText={markUpText} />
            </div>

            
          </aside>
       
          <main className="mt-10 slider-container">
            <Slider {...settings}>
              {imageUrl.map((item:any, index:any) => {
                console.log(item)
                return (
                  <div key={index}>
                    <Image
                      src={item.originalSrc}
                      alt="Product images"
                      width={600}
                      height={400}
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