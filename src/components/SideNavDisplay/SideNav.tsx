import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useGlobalContext } from '@/Context/GlobalContext'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { CartItem } from '../../../store/cartSlice';
import { IoClose } from "react-icons/io5";
import NavLogo from '../Navigation/NavLogo/NavLogo';
import * as motion from "motion/react-client"





const SideNav = () => {

  const [cartQuantity, setCartQuantity]= useState<string | number>(0)

  const cartState = useSelector((state: RootState) => state.cart)
  const cartQty = Number(cartState.totalQuantity)

  const {isMenuOpen, setOpenMenu, toggleMenu} = useGlobalContext()
  
  useEffect(() => {
    setCartQuantity(cartQty)
  }, [cartQty]);
  


  return (
         <motion.main 
         initial={{ x: '100%' }}
         animate={{ x: 0 }}
         exit={{ x: '100%' }}
         transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
         className="lg:hidden flex-col flex justify-items-end p-4 bg-gray-200 h-screen absolute z-50  w-screen">

            <div className="flex justify-between ">
                <div className="flex items-center">
                    <div className="flex xl:flex-row gap-5 flex-col justify-start items-center">
                        
                       <NavLogo/>

                        <div className="p-2 flex flex-col justify-start items-center">
                            <span className="text-zinc-800 text-xs">
                            Existence precedes Essence.
                            <br />
                            A Holistic and accessible approach to Functionality & Grunge.
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <IoClose 
                        size={50}
                        className="cursor-pointer "
                        onClick={toggleMenu}
                    />
                </div>
            
            </div>


            <div className="flex flex-col gap-12 translate-y-1/2 items-start text-xl" onClick={toggleMenu}>
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
        </motion.main>
   
  )
}

export default SideNav