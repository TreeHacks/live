import React from 'react';

import wordmarkSvg from '../assets/wordmark.svg';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <Link
      className="px-2 transition text-md text-foreground opacity-60 hover:opacity-100 font-medium"
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center my-4 text-brand-400 fixed top-0 z-10">
      <div className="w-[90%] max-w-5xl backdrop-blur-lg py-2 px-4 mx-auto rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-transparent">
        <div className="flex gap-2 items-center justify-center sm:justify-normal">
          <Image
            src={wordmarkSvg}
            alt="TreeHacks Live logo"
            className="h-8 w-auto"
          />
          <div className="hidden sm:flex ml-auto">
            <NavItem href="/schedule">Schedule</NavItem>
            <NavItem href="/packs">Devpost</NavItem>
            <NavItem href="/packs">FAQs</NavItem>
            <NavItem href="/packs">Resources</NavItem>
          </div>
        </div>
      </div>
    </div>
  );
}
