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


function showName(e, pathName:any){
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
  <div className="lg:flex lg:gap-5 text-md font-bold lg:items-center">
    {links.map((link) => (
      <NavLink key={link.name} {...link} />
    ))}
  </div>
);

const Navigation = () => {
  const navLinks = ['Shop', 'Showroom', 'Archive', 'Journal'].map((name) => ({
    name,
    href: `/${name.toLowerCase()}`,
  }));

  return (
    <nav className="flex justify-between lg:justify-center mx-auto container-width">
      <div className="flex  justify-center items-center">
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
              Designed & Engineered by Reveillerstudios.<br></br>
              A Holistic and accessible approach to Functionality & Grunge.
            </span>
          </div>
        </div>

        <div className="">
          <Image
            src="/images/rvrspinninglogo-unscreen.gif" 
            width={200}
            height={200}
            alt="rvr spinning logo"
          />
        </div>


      </div>


      <div className="flex">
        <NavLinks links={navLinks} />
      </div>
    </nav>
  );
};

export default Navigation;
