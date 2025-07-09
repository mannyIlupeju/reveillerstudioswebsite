'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { CartItem } from '../../../store/cartSlice';
import NavLogo from './NavLogo/NavLogo';
import { useGlobalContext } from '../../Context/GlobalContext'
import { Router } from 'next/router';

type NavLinkType = {
  name: string;
  href: string;
};



interface NavLinksProps {
  links: NavLinkType[];
}

const NavLink = ({ name, href }: NavLinkType) => {
  const [underlineVisible, setUnderlineVisible] = useState(false);
  const [linkName, setLinkName] = useState(name);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  
  
  
  const pathName = usePathname();
  const isActive = pathName?.startsWith(href);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const originalText = e.currentTarget.textContent || '';
    e.currentTarget.setAttribute('data-original-text', originalText);

    const id = setInterval(() => {
      setIsReversed((prev) => !prev);
      setLinkName(isReversed ? originalText.split('').reverse().join('') : originalText);
    }, 500);

    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setLinkName(name);
  };

 

  return (
    <div className="group">
      <Link href={href}>
        <span
          className={`${underlineVisible || isActive ? 'scale-x-100' : 'scale-x-0'}`}
          data-original-text={linkName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {linkName}
        </span>
      </Link>
    </div>
  );
};

const NavLinks: React.FC<NavLinksProps> = ({ links }) => (
  <div className="lg:flex lg:gap-5 lg:flex-row flex-col text-md font-bold lg:items-center">
    {links.map((link) => (
      <NavLink key={link.name} {...link} />
    ))}
  </div>
);

const Navigation = () => {
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [cartQuantity, setCartQuantity]= useState<string | number>(0)

  const {setIsCartOpen, toggleMenu, openCart, toggleCart} = useGlobalContext()

  const router = useRouter()

  
  const navLinks = ['Shop', 'Archive', 'About', 'Account'].map((name) => ({
    name,
    href: `/${name.toLowerCase().replace(/\s+/g, '')}`,
  }));




  const cartState = useSelector((state: RootState) => state.cart)
  const cartQty = Number(cartState.totalQuantity)
  
  useEffect(() => {
    setCartQuantity(cartQty)
  }, [cartQty]);

  const goHome = () => {
    router.push('/home')
  }

  return (
    <nav className="flex xl:justify-between justify-center gap-4 mx-auto p-2 nav-font xl:sticky z-20 top-0 glassBox">
      <div className="xl:flex hidden justify-between items-center">
        <div className="flex lg:flex-row gap-5 flex-col justify-start items-center">
          <div className="hidden lg:flex w-fit items-start">
            <Image
              src="/images/rvrspinninglogo-unscreen2.gif"
              width={150}
              height={150}
              alt="rvr spinning logo"
              priority
            />
          </div>

          <NavLogo/>
         
          <div className="p-2 flex flex-col justify-start items-center w-full">
            <span className="text-zinc-800 text-xs">
              Existence precedes Essence.
              <br />
              A Holistic and accessible approach to Functionality & Grunge.
            </span>
          </div>
        </div>
      </div>

   

      <div className="flex-row xl:flex hidden justify-end">
        <div className="flex gap-5">
          <NavLinks links={navLinks}/>
          <div className="flex items-center">
            <button onClick={toggleCart} className="flex gap-1">
              <h1>Cart</h1> 
              <span>({cartQuantity})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive menu */}
      <div className="xl:hidden justify-center cursor-pointer">
        <Link href="/">
          <Image
            src="/images/rvrspinninglogo-unscreen2.gif"
            width={50}
            height={50}
            alt="rvr spinning logo"
          />
        </Link>
      </div>
      
    </nav>
  );
};

export default Navigation;