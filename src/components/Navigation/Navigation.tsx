'use client';

import React, { useState } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import Image from 'next/image'
=======
import Image from 'next/image';
>>>>>>> origin/main
import { usePathname } from 'next/navigation';

type NavLinkType = {
  name: string;
  href: string;
};

interface NavLinksProps {
  links: NavLinkType[];
}

<<<<<<< HEAD

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
=======
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
          data-original-text={name}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {linkName}
>>>>>>> origin/main
        </span>
      </Link>
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> origin/main
const NavLinks: React.FC<NavLinksProps> = ({ links }) => (
  <div className="lg:flex lg:gap-5 lg:flex-row flex-col text-md font-bold lg:items-center">
    {links.map((link) => (
      <NavLink key={link.name} {...link} />
    ))}
  </div>
);

<<<<<<< HEAD




const Navigation = () => {
  const [isMenuOpen, setOpenMenu] = useState(false)
  const navLinks = ['Shop', 'Showroom', 'Archive', 'Journal'].map((name) => ({
=======
const Navigation = () => {
  const [isMenuOpen, setOpenMenu] = useState(false);
  const navLinks = ['Shop', 'Archive', 'Journal'].map((name) => ({
>>>>>>> origin/main
    name,
    href: `/${name.toLowerCase()}`,
  }));

<<<<<<< HEAD
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
=======
  const toggleMenu = () => {
    setOpenMenu((prevState) => !prevState);
  };

  return (
    <nav className="flex justify-between gap-4 mx-auto container nav-font">
      <div className="flex justify-center items-center">
        <div className="flex lg:flex-row flex-col justify-start items-center">
          <div className="hidden lg:flex w-fit items-start">
            <Image
              src="/images/rvrspinninglogo-unscreen2.gif"
              width={50}
              height={50}
              alt="rvr spinning logo"
              priority
            />
          </div>

          <Link href="/">
            <Image src="/images/rvrlogo-nav.png" height={250} width={250} alt="reveiller black logo" />
>>>>>>> origin/main
          </Link>

          <div className="p-2 flex justify-start items-center">
            <span className="text-zinc-800 text-xs">
<<<<<<< HEAD
              Existence precedes Essence.<br></br>
=======
              Existence precedes Essence.
              <br />
>>>>>>> origin/main
              A Holistic and accessible approach to Functionality & Grunge.
            </span>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* this logo shows on the normal screen */}
      <div className="hidden lg:flex">
        <Image
          src="/images/rvrspinninglogo-unscreen.gif" 
=======
      <div className="hidden">
        <Image
          src="/images/rvrspinninglogo-unscreen.gif"
>>>>>>> origin/main
          width={200}
          height={200}
          alt="rvr spinning logo"
        />
      </div>

<<<<<<< HEAD

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


      
=======
      <div className="lg:flex flex-row hidden">
        <div className="lg:flex gap-5">
          <NavLinks links={navLinks} />
          <div className="flex flex-row items-center">
            <Link href="/cart">
              <h1>Cart</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive menu */}
      <div className="lg:hidden flex cursor-pointer" onClick={toggleMenu}>
        <Image
          src="/images/rvrspinninglogo-unscreen2.gif"
          width={50}
          height={50}
          alt="rvr spinning logo"
        />
      </div>

      {isMenuOpen && (
        <div className="bg-gray-300 p-8">
          <NavLinks links={navLinks} />
        </div>
      )}
>>>>>>> origin/main
    </nav>
  );
};

<<<<<<< HEAD
export default Navigation;
=======
export default Navigation;
>>>>>>> origin/main
