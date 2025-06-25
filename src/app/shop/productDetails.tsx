'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProdDetailsConfiguration from './prodDetailsConfig'
import Image from 'next/image'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

const ProductDetails = ({ products, recommendations }: any) => {
  const { images, descriptionHtml, title, priceRange, variants, collections } = products

  const imageUrl = images.edges.map((item: any) => item.node)
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const [allLoaded, setAllLoaded] = useState(false)

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const updated = [...prev, index]
      if (updated.length === imageUrl.length) {
        setAllLoaded(true)
      }
      return updated
    })
  }

  const NextArrow = (props: any) => {
    const { onClick } = props
    return (
      <div
        onClick={onClick}
        className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ▶
      </div>
    )
  }
  
  const PrevArrow = (props: any) => {
    const { onClick } = props
    return (
      <div
        onClick={onClick}
        className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        ◀
      </div>
    )
  }

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "1rem",
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "25rem",
          speed: 2000,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          centerPadding: "2rem",
          speed: 2000,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: Math.min(2, imageUrl.length - 1),
          speed: 2000,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 2000,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        },
      },
    ],
  }

  return (
    <main className="overflow-x-hidden">
      <div className={`relative transition-opacity duration-700 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Image Slider */}
        <main className="mt-10 slider-container">
          <Slider {...settings}>
            {imageUrl.map((item: any, index: number) => (
              <div key={index} className="w-fit flex justify-center">
                {!loadedImages.includes(index) && (
                  <div className="w-[600px] h-[600px] bg-gray-300 animate-pulse rounded-md" />
                )}
                <Image
                  src={item.originalSrc}
                  alt={item.altText || 'Product image'}
                  width={600}
                  height={600}
                  className={`${!loadedImages.includes(index) ? 'hidden' : ''}`}
                  onLoadingComplete={() => handleImageLoad(index)}
                />
              </div>
            ))}
          </Slider>
        </main>

        {/* Product Configuration */}
        <ProdDetailsConfiguration
          title={title}
          priceRange={priceRange}
          variants={variants}
          descriptionHtml={descriptionHtml}
          collections={collections}
          images={images}
        />
      </div>

      {/* Recommended Products */}
      <section className={`p-3 ml-4 transition-opacity duration-700 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {recommendations?.length > 0 && (
          <section className="mt-10 px-4">
            <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-fit">
              {recommendations.map((item: any, index: number) => (
                <div className="flex flex-col" key={item.id || index}>
                  <div className="w-fit p-4 items-end">
                    {item.featuredImage?.url ? (
                      <Link href={`/shop/allProducts/${item.handle}`}>
                        <Image
                          src={item.featuredImage.url}
                          alt={item.featuredImage.altText || 'Product'}
                          width={200}
                          height={200}
                        />
                      </Link>
                    ) : (
                      <div className="w-[200px] h-[200px] bg-gray-300 animate-pulse rounded-md" />
                    )}
                  </div>

                  {/* Text Skeletons */}
                  <div className="flex flex-col align-bottom space-y-2">
                    {item.title ? (
                      <h3 className="text-lg">{item.title}</h3>
                    ) : (
                      <div className="h-6 bg-gray-300 rounded w-[150px] animate-pulse" />
                    )}

                    {item.priceRange ? (
                      <p>
                        {item.priceRange.minVariantPrice.amount}{" "}
                        {item.priceRange.minVariantPrice.currencyCode}
                      </p>
                    ) : (
                      <div className="h-5 bg-gray-300 rounded w-[100px] animate-pulse" />
                    )}
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
