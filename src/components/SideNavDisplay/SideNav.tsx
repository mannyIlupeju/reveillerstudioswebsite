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
import { usePathname } from 'next/navigation';   




const SideNav = () => {

  const [cartQuantity, setCartQuantity]= useState<string | number>(0)

  const pathname = usePathname();

  const linkClass = (path: string) =>
    `rounded-md transition-colors duration-200 ${
      pathname === path
        ? 'bg-orange-400 text-white font-bold p-2'
        : 'text-gray-600 hover:bg-orange-200 font-bold p-2'
    }`;
  



  const cartState = useSelector((state: RootState) => state.cart)
  const cartQty = Number(cartState.totalQuantity)

  const {isMenuOpen, setOpenMenu, toggleMenu} = useGlobalContext()
  
  useEffect(() => {
    setCartQuantity(cartQty)
  }, [cartQty]);
  


  return (
        <div className=" px-4 py-3 rounded-t-md glassBox items-center text-xs font-bold">
                <div className="flex gap-7 justify-around uppercase">
                    <Link href='/' className={linkClass('/')}>Home</Link>
                    <Link href='/shop' className={linkClass('/shop')}>Shop</Link>
                    <Link href='/archive' className={linkClass('/archive')}>Archive</Link>
                    <Link href='/journal' className={linkClass('/journal')}>Journal</Link>
                    <div className="flex items-center">
                        <Link href="/cart" className={`flex gap-1 ${linkClass('/cart')}`}>
                            <h1>Cart</h1> 
                            <span>({cartQuantity})</span>
                        </Link>
                    </div>
                </div>
        </div>
     
   
  )
}

export default SideNav