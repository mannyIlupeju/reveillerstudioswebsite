'use client'

import React, {useEffect} from 'react'
import ProdDetailsConfiguration from './prodDetailsConfig';
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navigation from '@/components/Navigation/Navigation';
import SideCart from '../../components/SideCartDisplay/SideCart'
import { useGlobalContext } from '@/Context/GlobalContext';




const ProductDetails = ({products}:any) => {

  const {id, images, descriptionHtml, title, priceRange, variants, price, collections} = products


  const {setIsCartOpen, isCartOpen} = useGlobalContext();

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
    <>     
            <div className="relative">
              <main className="mt-10 slider-container">
                  <Slider {...settings}>
                    {imageUrl.map((item:any, index:any) => {
                      return (
                        <div key={index}>
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
    </>
  )
}

export default ProductDetails