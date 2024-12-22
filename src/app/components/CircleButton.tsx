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
      } flex h-7 flex-row items-center justify-center gap-1 rounded-full border border-black/10 bg-theme-200 dark:border-white/10`}
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
