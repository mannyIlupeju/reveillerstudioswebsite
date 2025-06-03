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

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflowY = "hidden";
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.style.overflowY = "auto";
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.style.overflowY = "auto"; // Cleanup on unmount
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);


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

          {/* Overlay when cart is open (does not cover SideCart) */}
          {isCartOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)} // Clicking outside closes the cart
            ></div>
          )}
        
           
          <section className={`relative ${isCartOpen ? "overflow-hidden" : "overflow-auto"}`}>
            <div className="relative -z-10">
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
      </section>

       {/* SideCart - Keep it at higher z-index so overlay does not affect it */}
        {isCartOpen && (
          <div className="fixed top-0 right-0 z-50">
            <SideCart />
          </div>
        )}
    </>
  )
}

export default ProductDetails