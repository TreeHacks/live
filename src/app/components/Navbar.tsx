'use client';

import React from 'react';

import wordmarkSvg from '../assets/wordmark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCode,
  faHammer,
  faInfoCircle,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <Link
      className="px-2 transition text-md text-foreground opacity-60 hover:opacity-100 font-medium flex flex-col items-center justify-center gap-0.5"
      href={href}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ children, href }: NavItemProps) {
  const isCurr = usePathname() === href;

  return (
    <Link
      className={`transition text-2xl text-foreground flex flex-col items-center justify-center gap-1 ${
        isCurr ? 'opacity-100' : 'opacity-60'
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <div>
      <div className="w-full flex items-center justify-center my-4 text-brand-400 fixed top-0 z-10">
        <div className="sm:w-[90%] max-w-5xl backdrop-blur-lg py-2 px-4 mx-auto rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent">
          <div className="flex gap-2 items-center justify-center sm:justify-normal">
            <Image
              src={wordmarkSvg}
              alt="TreeHacks Live logo"
              className="h-8 w-auto hidden sm:flex"
            />
            <div className="hidden sm:flex ml-auto">
              <NavItem href="/">Schedule</NavItem>
              <NavItem href="/packs">Devpost</NavItem>
              <NavItem href="/packs">FAQs</NavItem>
              <NavItem href="/packs">Resources</NavItem>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex items-center justify-center fixed w-full z-10 pt-4">
        <div className="backdrop-blur-md rounded-full px-4 py-1 border border-black/10 dark:border-white/10 bg-white/80 dark:bg-transparent">
          <Image
            src={wordmarkSvg}
            alt="TreeHacks Live logo"
            className="h-8 w-auto"
          />
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-theme-100 grid grid-cols-4 justify-center pb-8 pt-4 z-10 px-4 sm:hidden border-t border-black/10 dark:border-white/10">
        <MobileNavItem href="/">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <div className="text-xs">Schedule</div>
        </MobileNavItem>
        <MobileNavItem href="/faq">
          <FontAwesomeIcon icon={faInfoCircle} />
          <div className="text-xs">FAQs</div>
        </MobileNavItem>
        <MobileNavItem href="/resources">
          <FontAwesomeIcon icon={faHammer} />
          <div className="text-xs">Resources</div>
        </MobileNavItem>
        <MobileNavItem href="/prizes">
          <FontAwesomeIcon icon={faTrophy} />
          <div className="text-xs">Prizes</div>
        </MobileNavItem>
      </div>
    </div>
  );
}
