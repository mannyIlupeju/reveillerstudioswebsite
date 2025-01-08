'use client'

import React, {useState} from 'react'
import DOMPurify from 'isomorphic-dompurify';


export default function ProdDetailsConfiguration({title, priceRange, variants, descriptionHtml}:any) {
  const [isButtonSelected, setSelectButton] = useState<string | null>(null)
  const [quantityAvailable, setQuantityAvailable] = useState(null)


  const productVariants = variants.edges.map((item:any)=>{
    return item.node
  })

  //convert descriptionhtml to normal text
  const markUpText =  descriptionHtml

  const CleanMarkUp = ({markUpText}: {markUpText: string}) => {
    const sanitizeDescription = DOMPurify.sanitize(markUpText);
    return <div dangerouslySetInnerHTML={{__html: sanitizeDescription}} />
  }


  function selectSize(e:React.MouseEvent, id:string){
    e.preventDefault();
  
    const sizeExist = productVariants.find((item:any)=> item.id === id);

    if(sizeExist){
      setSelectButton(id)
      setQuantityAvailable(sizeExist.quantityAvailable)
      console.log(id)
    }
  }

  console.log(isButtonSelected)

    return (
        <aside className="absolute z-10 p-3 ml-4 flex flex-col gap-5 font-bold -mt-3">
            <div className="glassBox p-3 text-xl flex flex-row gap-10 w-fit rounded-lg border-black">
              <span className="">{title}</span>
              <span>${priceRange.minVariantPrice.amount}</span>
            </div>

            <div className="flex flex-row justify-around gap-8" key={productVariants.id}>
                {variants.edges.map((item:any, index:any)=>{
                  const prices = item.node
                  return (
                    <button 
                      key={index}
                      id={prices.id} 
                      onClick={(e) => selectSize(e, prices.id)}
                      className={`
                        ${isButtonSelected == prices.id && quantityAvailable !== 0 ? `bg-green-400` : `bg-gray-300 `} rounded-xl p-3 glassBox`}
                      > 
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
                  
                
            <div className="bg-gray-100 p-2 rounded-lg text-xl leading-8 addToCartGlassBox">
              <CleanMarkUp markUpText={markUpText} />
            </div>

            
        </aside>
    )
}