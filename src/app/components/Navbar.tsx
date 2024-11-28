import React from 'react';

import wordmarkSvg from '../assets/wordmark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCode,
  faHammer,
  faInfo,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faDev } from '@fortawesome/free-brands-svg-icons';

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

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center my-4 text-brand-400 fixed sm:top-0 sm:bottom-auto bottom-0 z-10">
      <div className="sm:w-[90%] max-w-5xl backdrop-blur-lg py-2 px-4 mx-auto rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-transparent">
        <div className="flex gap-2 items-center justify-center sm:justify-normal">
          <Image
            src={wordmarkSvg}
            alt="TreeHacks Live logo"
            className="h-8 w-auto hidden sm:flex"
          />
          <div className="hidden sm:flex ml-auto">
            <NavItem href="/schedule">Schedule</NavItem>
            <NavItem href="/packs">Devpost</NavItem>
            <NavItem href="/packs">FAQs</NavItem>
            <NavItem href="/packs">Resources</NavItem>
          </div>
          <div className="flex gap-2 sm:hidden text-2xl">
            <NavItem href="/schedule">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <div className="text-xs">Schedule</div>
            </NavItem>
            <NavItem href="/packs">
              <FontAwesomeIcon icon={faInfoCircle} />
              <div className="text-xs">FAQs</div>
            </NavItem>
            <NavItem href="/packs">
              <FontAwesomeIcon icon={faHammer} />
              <div className="text-xs">Resources</div>
            </NavItem>
            <NavItem href="/packs">
              <FontAwesomeIcon icon={faCode} />
              <div className="text-xs">Devpost</div>
            </NavItem>
          </div>
        </div>
      </div>
    </div>
  );
}
