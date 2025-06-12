'use client';

import React, {useEffect} from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import SideNav from '@/components/SideNavDisplay/SideNav';
import SideCart from '../components/SideCartDisplay/SideCart';
import { useGlobalContext } from '@/Context/GlobalContext';
import { usePathname } from 'next/navigation';


export default function LayoutWithCart({ children }: { children: React.ReactNode }) {
  const { isCartOpen, setIsCartOpen, isMenuOpen, toggleMenu } = useGlobalContext();
  const pathname = usePathname();

  const isCartPage = pathname === '/cart';


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


    useEffect(() => {
      const handleResize = () => {
        if(window.innerWidth >= 768 && isMenuOpen){
          toggleMenu();
        }
      }

      window.addEventListener('resize', handleResize);

      handleResize();
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isMenuOpen, toggleMenu]);



  return (
    <>
      {isCartOpen && !isCartPage && (
          <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsCartOpen(false)} // Clicking outside closes the cart
          ></div>
      )}

      {isMenuOpen ? <SideNav/> :  <Navigation />}
        <main className={`flex flex-col ${isMenuOpen ? 'h-screen overflow-y-hidden' : 'overflow-y-auto'}`}>
          {children}
        </main>
      {!isMenuOpen && <Footer />}

      
      {isCartOpen && !isCartPage &&  <SideCart/>}
    </>
  );
}