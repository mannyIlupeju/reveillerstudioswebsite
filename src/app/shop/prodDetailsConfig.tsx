'use client'

import React, {useState} from 'react'
import DOMPurify from 'isomorphic-dompurify';
import { useSelector, useDispatch} from 'react-redux'
import Accordion from '@/components/Accordion/Accordion';
import { getAccordionData  } from '../../../utils/AccordionDataObj/accordion';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie'
import client from '../../lib/shopify/shopify-client/shopify-client';
import { useGlobalContext } from '@/Context/GlobalContext';
import { addItem, setLoading, setError } from '../../../store/cartSlice';
import type { RootState } from '../../../store/store';
import { CartItem } from '../../../store/cartSlice';
import { refreshCart } from '../../../utils/cartFunctions/cartFunctions';



  type Attribute = {
    key: string,
    value:string
  }


  type LineItemTypes = {
    merchandiseId: string,
    quantity: number,
    attributes: {}
  };
  
  type ShopifyCartID = {
    shopifyCartId: string
  };

  type ShopifyCartResponse = {
  cart: {
    id: string
  }
}


  type SelectedOption = {
    name: string;
    value: string;
  };

  type SizeInfo = {
    availableForSale: boolean;
    id: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    quantityAvailable: number;
    title: string;
    selectedOptions: SelectedOption[]; // This ensures selectedOptions is always an array
  };



export default function ProdDetailsConfiguration({id, title, priceRange, variants, descriptionHtml, collections, images}:any) {
  const [isButtonSelected, setSelectButton] = useState<string | null>(null)
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<{[key: string]: number}>({});
  const [isItemAddedToCart, setIsItemAddedToCart] = useState<'default'| 'loading' | 'added'>('default')
  // const [isLoading, setIsLoading] = useState<string>('Add to Cart')
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart)



  const {quantityAvailable, setQuantityAvailable, sizeInfo, setSizeInfo, cartId, setCartId, setIsCartOpen}= useGlobalContext()

  const sizeDetails = sizeInfo.selectedOptions[1] ?? null;

  const collectionItemSearch = collections.edges.map((item:any) => item.node.title)
  const collectionItems = collectionItemSearch.filter((item:any) => item !== "All")

  const collectionItem = collectionItems[0]



  const productVariants = variants.edges.map((item:any)=>{
    return item.node
  })

  const productPrice = priceRange.minVariantPrice.amount

  const productImages = images.edges.map((item:any) => item.node.originalSrc)
  const productImage = productImages[0]


  function selectSize(e:React.MouseEvent, id:string){
    e.preventDefault();
    console.log("select size")

    const sizeExist = productVariants.find((item:any) => item.id === id);


    if(sizeExist){
      setSelectButton(id)
      setQuantityAvailable(sizeExist.quantityAvailable)
      setSizeInfo(sizeExist)
    }
    
  }

  const increaseAmt = (variantId: string, quantityAvailable: number|null) => {
    if(quantityAvailable === null) return;

    setQuantity(prev => {
      const currentQty = prev[variantId] || 1;
      if (quantityAvailable > currentQty) {
        return {...prev, [variantId]: currentQty + 1};
      }
      return prev;
    });
}
  
  const decreaseAmt = (variantId: string) => {
    setQuantity(prev => {
      const currentQty = prev[variantId] || 1;
      if (currentQty > 1) {
        return {...prev, [variantId]: currentQty - 1};
      }
      return prev;
    });
  }


  
  async function AddToCart({title, productImage, quantities, productPrice, variants}:any){
    if(!isButtonSelected){
      console.error("No size selected")
      return;
    }

    console.log(variants)
    
    const productAdded = {
      title,
      productImage,
      quantity: Number(quantities) || 1, 
      productPrice, 
      variants
    }

    const productVariantID = sizeInfo?.id
    if(!productVariantID) {
      console.error("Variant ID is missing")
      return;
    }

    const selectedQuantity = quantity[isButtonSelected] || 1;

    try {
      if(!productVariantID) {
        return;
      }

      let shopifyCartId: string | undefined = Cookies.get('cartId');

      if (!shopifyCartId) {
        const response = await fetch('/api/shopifyCart/createCart', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            variants: productVariantID, 
            quantity: selectedQuantity,
          })
        });

        

        if (!response.ok) {
          throw new Error('Failed to add product to cart')
        }
        
        const cartData:ShopifyCartResponse = await response.json();
        
          if(cartData.cart.id){
            shopifyCartId = cartData.cart.id;
            Cookies.set('cartId', shopifyCartId as string, { expires: 7 });
            setCartId(shopifyCartId)
          
          } else {
            
          console.error("Cart ID not found in response:", cartData);
          return;
        }

      } else {
        setCartId(shopifyCartId)
      }

      const lineItems:LineItemTypes[] = [{
        merchandiseId: productVariantID,
        quantity: selectedQuantity,
        attributes: ({
          key: sizeDetails.name,
          value: sizeDetails.value
        })
      }]

      setIsItemAddedToCart('loading')
      await addItemToCart(shopifyCartId, lineItems)

     } catch(error){
       console.error('Error creating cart:', error);
       return null;
     }


      async function addItemToCart(shopifyCartId:string, lineItems:LineItemTypes[]){
        
        if(!shopifyCartId && lineItems.length === 0){
          return;
        }
      

          try {
            const selectedQuantity = quantity[isButtonSelected!] || 1;


           const cartItem: CartItem = {
             id: `temp_${productVariantID}`, // Use temporary ID initially
             title: title,
             price: Number(productPrice),
             quantity: selectedQuantity,
             image: productImage,
             currencyCode:
               variants.edges[0]?.node.priceV2.currencyCode || "USD", // Get from variants
             size: {
               name: sizeDetails.name,
               value: sizeDetails.value,
             },
             variantId: productVariantID,
             merchandise: {
               id: productVariantID,
               image: {
                 src: productImage,
                 altText: null,
               },
               priceV2: {
                 amount: Number(productPrice),
                 currencyCode:
                   variants.edges[0]?.node.priceV2.currencyCode || "USD",
               },
               product: {
                 title: title,
                 handle: variants.edges[0]?.node.product?.handle || "",
                 vendor: variants.edges[0]?.node.product?.vendor || "",
               },
             },
             attributes: [
               {
                 key: "Size",
                 value: sizeDetails.value,
               },
             ],
           };

            if (!sizeDetails) {
              throw new Error('Please select a size');
            }
            
            dispatch(addItem(cartItem));
            
            dispatch(setLoading(true));


            const response = await fetch('/api/shopifyCart/addItemToCart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                cartId: shopifyCartId,
                merchandiseId: productVariantID,
                quantity: selectedQuantity,
                size: sizeDetails
              })
            });
            
            
            if (!response.ok) {
              throw new Error('Failed to add item to cart');
            }
            
            // Refresh cart to get the correct line IDs from Shopify
            await refreshCart(shopifyCartId, dispatch);
            
            setIsItemAddedToCart('added')
            setIsCartOpen(true)
            console.log("Product added to cart successfully");
          } catch(error) {
            dispatch(setError(error instanceof Error ? error.message : 'Failed to add item'));
            console.error("Error adding item to cart:", error)
          } finally {
            dispatch(setLoading(false));
          }
        
      }
    
  }


  // Add descriptionHtml, collection
  const accordionData = getAccordionData(descriptionHtml, collectionItem);



  return (
    <aside className='xl:absolute xl:z-1 xl:top-4 p-3 ml-4 flex flex-col w-fit gap-5 font-bold cursor-pointer'>
      <div className='prodDetailsOptionsBox p-3 text-xl flex gap-10 w-fit rounded-lg border-black'>
        <span className=''>{title}</span>
        <span>${productPrice}</span>
      </div>


      {/* Size options display buttons */}
      <div
        className='flex flex-row justify-around gap-8'
        key={productVariants.id}
      >
        {variants.edges.map((item: any, index: any) => {
          const prices = item.node;
          return (
            <button
              key={index}
              id={prices.id}
              onClick={(e) => selectSize(e, prices.id)}
              className={`
                ${isButtonSelected == prices.id && quantityAvailable !== 0 ? `glassBox-green` : `glassBox`} rounded-xl p-3 cursor-pointer`}
            >
              {prices.selectedOptions[1].value}
            </button>
          );
        })}
      </div>



        {/* Remaining quantity available notifier */}
        {isButtonSelected && quantityAvailable !== null && (
          <div className='prodDetailsOptionsBox w-fit p-3'>
            <p>{`Only ${quantityAvailable} item(s) remaining`}</p>
          </div>
        )}



      {/* Item is sold out notifier */}
      {quantityAvailable == 0 && (
        <div className='prodDetailsOptionsBox w-fit p-3'>
          <p>Item is sold out</p>
        </div>
      )}


        {/* Increase and Decrease quantity */}
        {isButtonSelected && (
          <div className='flex gap-5 w-fit mx-auto px-1 mt-2 '>
            <div className="flex self-center hover:bg-orange-400 p-3 rounded-lg">
              <FaMinus 
                
                onClick={() => decreaseAmt(isButtonSelected)} 
                />
            </div>
            <span className='font-bold text-lg bg-gray-200 p-4'>
              {quantity[isButtonSelected] || 1}
            </span>
            <div className="flex self-center hover:bg-orange-400 p-3 rounded-lg">
            <FaPlus 
              onClick={() => increaseAmt(isButtonSelected, quantityAvailable)} 
              />
            </div>
          </div>
        )}



        {/* Add to Cart button */}
        <button
          disabled={quantityAvailable === null || quantityAvailable === 0}
          className={`${
            quantityAvailable === null || quantityAvailable === 0
              ? `prodDetailsOptionsBox`
              : `addToCartBox text-zinc-800 font-semibold text-xl cursor-pointer`
          } p-4 rounded-lg`}
          onClick={()=>{
            if(quantityAvailable !== 0){
              AddToCart({title, productImage, quantity, productPrice, variants, isButtonSelected})
            }
          }}
        >
          {isItemAddedToCart === 'default' && "Add to Cart"}
          {isItemAddedToCart === 'loading' && "Hol'up, wait a minute"}
          {isItemAddedToCart === 'added' && "Item added to Cart"}
        </button>



        {/* Product information rendered by an accordion */}
        {accordionData.map((data) => (
          <Accordion
            key={data.id}
            data={data}
            isActive={activeAccordionId === data.id}
            toggleAccordion={() =>
              setActiveAccordionId((previd) =>
                previd === data.id ? null : data.id
              )
            }
          />
        ))}
    </aside>
  )
}