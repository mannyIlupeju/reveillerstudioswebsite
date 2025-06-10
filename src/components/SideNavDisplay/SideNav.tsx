import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useGlobalContext } from '@/Context/GlobalContext'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { CartItem } from '../../../store/cartSlice';
import { IoClose } from "react-icons/io5";


function SideNav() {

  const [cartQuantity, setCartQuantity]= useState<string | number>(0)

  const cartState = useSelector((state: RootState) => state.cart)
  const cartQty = Number(cartState.totalQuantity)

  const {isMenuOpen, setOpenMenu, toggleMenu} = useGlobalContext()
  
  useEffect(() => {
    setCartQuantity(cartQty)
  }, [cartQty]);
  


  return (
         <main className="lg:hidden flex items-center justify-items-end p-4 bg-gray-200 h-screen absolute z-10  w-screen">

            <div className="flex justify-between absolute top-4">
                <div className="flex justify-center items-center">
                    <div className="flex lg:flex-row flex-col justify-start items-center">


                        <Link href="/">
                            <Image src="/images/rvrlogo-nav.png" height={250} width={250} alt="reveiller black logo" className="-translate-x-10 lg:translate-x-0"/>
                        </Link>

                        <div className="p-2 flex flex-col justify-start items-center">
                            <span className="text-zinc-800 text-xs">
                            Existence precedes Essence.
                            <br />
                            A Holistic and accessible approach to Functionality & Grunge.
                            </span>
                        </div>
                    </div>
                </div>

                
                <IoClose 
                    size={50}
                    className="cursor-pointer absolute -right-44"
                    onClick={toggleMenu}
                />
            
            </div>


            <div className="flex flex-col gap-5 relative right-0 items-center text-xl">
              <Link href='/'>Home</Link>
              <Link href='/shop'>Shop</Link>
              <Link href='/archive'>Archive</Link>
              <Link href='/journal'>Journal</Link>
              <div className="flex items-center">
              <Link href="/cart" className="flex gap-1">
                <h1>Cart</h1> 
                <span>({cartQuantity})</span>
              </Link>
            </div>
            </div>
        </main>
   
  )
}

export default SideNav