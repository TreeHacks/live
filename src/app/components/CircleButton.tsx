import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

interface CircleButtonProps {
  onClick?: () => void;
  href?: string;
  icon: IconProp;
  iconClassName?: string;
  children?: React.ReactNode;
}

export default function CircleButton({
  onClick,
  href,
  icon,
  iconClassName,
  children,
}: CircleButtonProps) {
  const toReturn = (
    <button
      className={`${
        children != null ? 'px-2' : 'w-7'
      } h-7 rounded-full border bg-theme-200 border-black/10 dark:border-white/10 flex flex-row items-center justify-center gap-1`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className={iconClassName} />
      {children}
    </button>
  );

  if (href != null) {
    return (
      <Link href={href} target="_blank">
        {toReturn}
      </Link>
    );
  }

  return toReturn;
}
