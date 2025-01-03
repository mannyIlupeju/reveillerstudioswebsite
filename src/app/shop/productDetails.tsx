'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DOMPurify from 'isomorphic-dompurify';



const ProductDetails = ({products}:any) => {
  const [isButtonSelected, setSelectButton] = useState<string | null>(null)
  const [quantityAvailable, setQuantityAvailable] = useState(null)
  const[productChoice, selectProductChoice] = useState({size: "", quantity: ""})

  

  const {images, descriptionHtml, title, priceRange, variants, price} = products

  const productVariants = variants.edges.map((item:any)=>{
    return item.node
  })

  

  


  //get images from product object
  const imageUrl = images.edges.map((item:any)=> {
    const images = item.node
    return images
  })


  //convert descriptionhtml to normal text
  const markUpText =  descriptionHtml

  const CleanMarkUp = ({markUpText}: {markUpText: string}) => {
    const sanitizeDescription = DOMPurify.sanitize(markUpText);
    return <div dangerouslySetInnerHTML={{__html: sanitizeDescription}} />
  }


  //settings for the slider
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40rem",
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
          slidesToShow: 3,
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
        breakpoint: 768,
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


  function selectSize(e:MouseEvent, id:string){
    e.preventDefault();
  
    const sizeExist = productVariants.find((item:any)=> item.id === id);

    if(sizeExist){
      setSelectButton(id)
      setQuantityAvailable(sizeExist.quantityAvailable)
      console.log(quantityAvailable)
    }

  }

  



  return (
      <section className="relative">
          <aside className="absolute z-10 p-3 ml-4 flex flex-col gap-5 font-bold -mt-3">
            <div className="bg-gray-100 p-3 text-xl flex flex-row gap-10 w-fit rounded-lg border-black">
              <span className="">{title}</span>
              <span>${priceRange.minVariantPrice.amount}</span>
            </div>

            <div className="flex flex-row justify-center gap-8" key={productVariants.id}>
                {variants.edges.map((item:any, index:any)=>{
                  const prices = item.node
                  return (
                    <button 
                      key={index}
                      id={prices.id} 
                      onClick={(e)=> selectSize(e, prices.id)}
                      className={`
                        ${isButtonSelected === prices.id && quantityAvailable !== 0 ? `bg-green-400 rounded-xl p-3` : `bg-gray-100 rounded-xl p-3`}`
                      }> 
                      {prices.selectedOptions[1].value} 
                    </button> 
                  )
                })}
            </div>

            {quantityAvailable == null || quantityAvailable == 0 ? 
             '' : 
              <div className='bg-gray-100 w-fit p-3'>
              <p>{`Only ${quantityAvailable} item(s) remaining`}</p>
              </div>
            }

            {quantityAvailable == 0 && 
              <div className='bg-gray-100 w-fit p-3'>
                <p>Item is sold out</p>
              </div>
            }
            
            {/* fix this button issue */}
            <button 
              disabled={quantityAvailable === null || quantityAvailable === 0}
              className={`${quantityAvailable === null || quantityAvailable === 0 ?  `bg-gray-300` : `bg-green-600 text-yellow-300 font-semibold text-xl`
                  

              } p-4 rounded-lg`}
            >
              Add to Cart
            </button>
                  
                
            <div className="bg-gray-100 p-2 rounded-lg">
              <CleanMarkUp markUpText={markUpText} />
            </div>

            
          </aside>
       

          <main className="mt-10 slider-container">
            <Slider {...settings}>
              {imageUrl.map((item:any, index:any) => {
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