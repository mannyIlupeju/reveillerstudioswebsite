// UI for each product slug

'use client'

import React from 'react'
import Link from 'next/link'
import ProdDetailsConfiguration from './prodDetailsConfig';
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";





const ProductDetails = ({products, recommendations}:any) => {
  console.log(recommendations)

  const recommendedlogs = recommendations.map((item) => item)
  console.log(recommendedlogs)

  const {id, images, descriptionHtml, title, priceRange, variants, price, collections} = products




  //get images from product object
  const imageUrl = images.edges.map((item:any)=> {
    const images = item.node
    return images
  })



  //settings for the slider
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
   
    slidesToShow: 2,
    slidesToScroll: 1,
    speed:3000,
    autoplay:true,
    autoplaySpeed:2000,
    cssEase: "linear",
    responsive: [
        {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "25rem",
          speed:2000,
          autoplay:true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:1,
          slidesToScroll: 2,
          infinite: true,
          centerPadding: "8rem",
          speed:2000,
          autoplay:true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    <main className="overflow-x-hidden">     
            <div className="relative">
              <main className="mt-10 slider-container">
                  <Slider {...settings}>
                    {imageUrl.map((item:any, index:any) => {
                      return (
                        <div key={index} className="w-fit flex justify-center">
                          <Image
                            src={item.originalSrc}
                            alt="Product images"
                            width={600}
                            height={600}
                          />
                        </div>
                            
                      )
                    })}
                  </Slider>
              </main>

              <ProdDetailsConfiguration 
                title={title} 
                priceRange={priceRange} 
                variants={variants} 
                descriptionHtml={descriptionHtml} 
                collections={collections} 
                images={images} 
              /> 
          </div>      

          <section className="p-3 ml-4">
            {recommendedlogs && recommendedlogs.length > 0 && (
              <section className="mt-10 px-4">
                <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-fit ">
                  {recommendedlogs.map((item:any, index:number) => (
                    <div className="flex flex-col" key={item.id || index}>
                      <div key={item.id || index} className="w-fit p-4 items-end">
                        {item.featuredImage?.url && (
                          <Link href={`/shop/allProducts/${item.handle}`} key={item.id}>
                            <Image
                              src={item.featuredImage.url}
                              alt={item.featuredImage.altText || 'Product'}
                              width={200}
                              height={200}
                              />
                          </Link>
                        )}
                      </div>
                      <div className="flex flex-col align-bottom">
                        <h3 className="text-lg">{item.title}</h3>
                        <p>
                          {item.priceRange.minVariantPrice.amount} {item.priceRange.minVariantPrice.currencyCode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>
    </main>
  )
}

export default ProductDetails