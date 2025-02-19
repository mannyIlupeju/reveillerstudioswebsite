'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
          data-original-text={name}
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
  const navLinks = ['Shop', 'Archive', 'Journal'].map((name) => ({
    name,
    href: `/${name.toLowerCase()}`,
  }));

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
          </Link>

          <div className="p-2 flex justify-start items-center">
            <span className="text-zinc-800 text-xs">
              Existence precedes Essence.
              <br />
              A Holistic and accessible approach to Functionality & Grunge.
            </span>
          </div>
        </div>
      </div>

      <div className="hidden">
        <Image
          src="/images/rvrspinninglogo-unscreen.gif"
          width={200}
          height={200}
          alt="rvr spinning logo"
        />
      </div>

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
    </nav>
  );
};

export default Navigation;
