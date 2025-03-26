'use client'

import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { FaXmark } from "react-icons/fa6";
import { FaMinus, FaPlus } from 'react-icons/fa';
import Image from "next/image"
import { useGlobalContext } from '@/Context/GlobalContext';
import { RootState } from "../../../store/store";
import {useSelector, useDispatch} from 'react-redux'
import { removeItem, setLoading, updateQuantity, setCartItems, setError } from "../../../store/cartSlice";
import { removeCartItem, updateCartQty, refreshCart, handleCheckout } from "../../../utils/cartFunctions/cartFunctions";

export default function SideCart() {

  const router = useRouter();
  const [cartId, setCartId] = useState<string | null>(null);
  const dispatch = useDispatch();


  const {setIsCartOpen, isCartOpen} = useGlobalContext();

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  console.log(cartItems)

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  },0).toFixed(2)


  function goToCart(){
    router.push('/cart')
  }


  function closeCart(){
    console.log('Cart closed')
    setIsCartOpen(false)
  }

  useEffect(() => {
    async function fetchCartId(){
      const response = await fetch("/api/get-cart-id");
      const data = await response.json()
      console.log(data)
      setCartId(data.cartId);
    }
    fetchCartId();
  }, []);

  console.log(cartId)

  return (
    <div className=" bg-gray-200 w-96 top-0 right-0 glassBox h-screen fixed flex flex-col">
  
        <div className="flex m-5 border-black sticky top-0 bg-gray-200 z-10">
          <FaXmark onClick={closeCart} size={20}/>
          <h1 className="mx-auto">Your Bag</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {cartItems.map((item) => (
              <div key={item.id}
                  className='flex flex-row gap-4'
              >
                  <Image
                      src={item.image}
                      width={120}
                      height={50}
                      priority
                      alt={item.title}
                  />
          
                  <div className="flex flex-col justify-center">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-sm"> Price: {Number.parseFloat(Number(item.price * item.quantity).toFixed(2))}
                          {item.currencyCode}
                      </span>
                      <span className="text-sm">Size: {item.size.value}</span>
                    
                      <div className='flex w-fit mt-2 gap-2'>
                          <button 
                            className='disabled:opacity-50'
                            onClick={() => updateCartQty(item.id, cartId, Math.max(0, item.quantity - 1), dispatch)}
                          >
                            <FaMinus className='flex self-center' />
                          </button>
                          <span className='font-bold text-sm flex self-center'>
                          {item.quantity}
                          </span>
                          <button
                              className="p-2 hover:bg-gray-100 rounded"
                              onClick={() => updateCartQty(item.id, cartId, item.quantity + 1, dispatch)}
                          >
                              <FaPlus className="w-4 h-4" />
                          </button>
                      </div>
                      <button 
                          onClick={() => cartId && removeCartItem(item.id, cartId, dispatch)}
                          className="flex items-start mt-2  py-2 text-zinc-800 rounded  hover:underline"
                      >
                          Remove
                      </button>
                  </div>
              </div>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-xl">Sub Total:  </span>
              <span >${cartTotal} {cartItems[0]?.currencyCode || ''}</span>
            </div>
          <button 
            className="border-black border-2 w-full p-2"
            onClick={() => router.push('/cart')}
            >
            <h1>OR FULL VIEW BAG</h1>
          </button>
          </div>
        
      </div>
     
      <p className="text-xl mx-auto">Estimated Total: ${cartTotal} {cartItems[0]?.currencyCode || ''} </p>
      <button 
        className="bg-zinc-800 w-full text-white p-4 mx-auto"
        onClick={() => handleCheckout(cartId)}
        >
        Continue to Checkout
      </button>
     
    </div>
  
  )
}
