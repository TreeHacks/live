'use client';

import React from 'react';

import wordmarkSvg from '../assets/wordmark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
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
      className="text-md flex flex-col items-center justify-center gap-0.5 px-2 font-medium text-foreground opacity-60 transition hover:opacity-100"
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ children, href }: NavItemProps) {
  const isCurr = usePathname() === href;

  return (
    <Link
      className={`flex flex-col items-center justify-center gap-1 text-2xl text-foreground transition ${
        isCurr ? 'opacity-100' : 'opacity-60'
      }`}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <div>
      <div className="fixed top-0 z-10 my-4 hidden w-full items-center justify-center text-brand-400 sm:flex">
        <div className="mx-auto max-w-5xl rounded-full border border-black/10 bg-white/80 px-4 py-2 backdrop-blur-lg sm:w-[90%] dark:border-white/10 dark:bg-transparent">
          <div className="flex items-center justify-center gap-2 sm:justify-normal">
            <Image
              src={wordmarkSvg}
              alt="TreeHacks Live logo"
              className="h-8 w-auto"
            />
            <div className="ml-auto flex">
              <NavItem href="/">Schedule</NavItem>
              <NavItem href="/packs">Devpost</NavItem>
              <NavItem href="https://docs.google.com/document/d/162lC3yzvkURS1FZcVX-vpMckuWYkbqnoESZcPdxRdHk/edit">
                FAQs
              </NavItem>
              <NavItem href="/resources">Resources</NavItem>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed z-10 flex w-full items-center justify-center pt-4 sm:hidden">
        <div className="rounded-full border border-black/10 bg-white/80 px-4 py-1 backdrop-blur-md dark:border-white/10 dark:bg-transparent">
          <Image
            src={wordmarkSvg}
            alt="TreeHacks Live logo"
            className="h-8 w-auto"
          />
        </div>
      </div>
      <div className="fixed bottom-0 z-10 grid w-full grid-cols-4 justify-center border-t border-black/10 bg-theme-100 px-4 pb-8 pt-4 sm:hidden dark:border-white/10">
        <MobileNavItem href="/">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <div className="text-xs">Schedule</div>
        </MobileNavItem>
        <MobileNavItem href="/resources">
          <FontAwesomeIcon icon={faHammer} />
          <div className="text-xs">Resources</div>
        </MobileNavItem>
        <MobileNavItem href="https://docs.google.com/document/d/162lC3yzvkURS1FZcVX-vpMckuWYkbqnoESZcPdxRdHk/edit">
          <FontAwesomeIcon icon={faInfoCircle} />
          <div className="text-xs">FAQs</div>
        </MobileNavItem>
        <MobileNavItem href="/prizes">
          <FontAwesomeIcon icon={faTrophy} />
          <div className="text-xs">Prizes</div>
        </MobileNavItem>
      </div>
    </div>
  );
}
