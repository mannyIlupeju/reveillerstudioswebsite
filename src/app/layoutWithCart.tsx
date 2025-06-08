'use client';

import React, {useEffect} from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import SideCart from '../components/SideCartDisplay/SideCart';
import { useGlobalContext } from '@/Context/GlobalContext';

export default function LayoutWithCart({ children }: { children: React.ReactNode }) {
  const { isCartOpen, setIsCartOpen } = useGlobalContext();

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

  return (
    <>

    {/* Overlay when cart is open (does not cover SideCart) */}
    {isCartOpen && (
         <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)} // Clicking outside closes the cart
        ></div>
    )}


      <Navigation />
      <main className="flex flex-col">{children}</main>
      <Footer />

      
      
      {/* SideCart - Keep it at higher z-index so overlay does not affect it */}
      {isCartOpen && (
         <div className="fixed top-0 right-0 z-50">
            <SideCart />
         </div>
       )}
    </>
  );
}