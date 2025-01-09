'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';

type NavLinkType = {
  name: string;
  href: string;
};

interface NavLinksProps {
  links: NavLinkType[];
}


function showName(e:React.MouseEvent, pathName:any){
  console.log(pathName)
}

const NavLink = ({ name, href }: NavLinkType) => {
  const [underlineVisible, setUnderlineVisible] = useState(false);
  const [isLinkHovered, setLinkIsHovered] = useState(null);
  const pathName = usePathname();
  const isActive = pathName?.startsWith(href);

  console.log(pathName)

  return (
    <div className="group">
      <Link
        href={href}
      >
        <span
          className={` ${underlineVisible || isActive ? 'scale-x-100' : 'scale-x-0'
          }`}
        >{name}
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
  const [isMenuOpen, setOpenMenu] = useState(false)
  const navLinks = ['Shop', 'Showroom', 'Archive', 'Journal'].map((name) => ({
    name,
    href: `/${name.toLowerCase()}`,
  }));

  function displayMenu(e:React.MouseEvent) {
  e.preventDefault();
  setOpenMenu(true)   
  console.log('open menu')
  }

  return (
    <nav className="flex justify-around gap-4 lg:justify-center mx-auto container-width nav-font">
      <div className="flex justify-center items-center">
        <div className="flex lg:flex-row flex-col justify-start items-center">
          <Link href='/'>
            <Image
            src='/images/rvrlogo-nav.png'
            height={250}
            width={250}
            alt="reveiller black logo"/>
          </Link>

          <div className="p-2 flex justify-start items-center">
            <span className="text-zinc-800 text-xs">
              Existence precedes Essence.<br></br>
              A Holistic and accessible approach to Functionality & Grunge.
            </span>
          </div>
        </div>
      </div>

      {/* this logo shows on the normal screen */}
      <div className="hidden lg:flex">
        <Image
          src="/images/rvrspinninglogo-unscreen.gif" 
          width={200}
          height={200}
          alt="rvr spinning logo"
        />
      </div>


      <div className="hidden lg:flex">
        <NavLinks links={navLinks} />
      </div>

      {/* this logo is meant to be a responsive menu */}
      <div className="lg:hidden flex cursor-pointer">
        <Image
            src="/images/rvrspinninglogo-unscreen.gif" 
            width={250}
            height={250}
            alt="rvr spinning logo"
            onClick={displayMenu}
          />
      </div>

      {isMenuOpen && 
      <div className="bg-gray-300 p-8">
        <NavLinks links={navLinks} />
      </div>
      }


      
    </nav>
  );
};

export default Navigation;
