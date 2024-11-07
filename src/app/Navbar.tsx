import React from 'react';

import wordmarkSvg from './assets/wordmark.svg';
import Image from 'next/image';
import Link from 'next/link';

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <Link
      className="px-2 rounded-md hover:bg-black/10 transition text-lg"
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-center my-4 font-medium text-brand-400">
      <div className="bg-theme-300 w-[90%] max-w-[62rem] backdrop-blur-lg py-2 px-4 mx-auto rounded-lg border border-black/10 dark:border-white/10">
        <div className="flex gap-2 items-center ">
          <Image
            src={wordmarkSvg}
            alt="TreeHacks Live logo"
            className="h-8 w-auto"
          />
          <div className="hidden md:flex">
            <NavItem href="/schedule">Schedule</NavItem>
          </div>
        </div>
      </div>
    </div>
  );
}
