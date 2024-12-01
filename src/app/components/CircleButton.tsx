import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface CircleButtonProps {
  onClick?: () => void;
  href?: string;
  icon: IconProp;
}

export default function CircleButton({
  onClick,
  href,
  icon,
}: CircleButtonProps) {
  const toReturn = (
    <button
      className="w-7 h-7 rounded-full border bg-theme-200 border-black/10 dark:border-white/10"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
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
