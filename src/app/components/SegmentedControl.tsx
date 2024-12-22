import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface SegmentedControlOption {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  onSelect: (id: string) => void;
}

export default function SegmentedControl({
  options,
  onSelect,
}: SegmentedControlProps) {
  const [selected, setSelected] = useState<string>(options[0].id);
  const optionRefs = useRef<Record<string, HTMLButtonElement>>({});

  const [selectorWidth, setSelectorWidth] = useState(0);
  const [selectorHeight, setSelectorHeight] = useState(0);
  const [selectorX, setSelectorX] = useState(0);

  useEffect(() => {
    if (optionRefs.current) {
      const elem = optionRefs.current[selected];

      if (!elem) {
        return;
      }

      const childRect = elem.getBoundingClientRect();
      const parentRect = elem.parentElement!.getBoundingClientRect();

      setSelectorWidth(childRect.width);
      setSelectorHeight(childRect.height);

      setSelectorX(childRect.left - parentRect.left);
    }
  }, [optionRefs, selected]);

  return (
    <div className="flex-shrink">
      <div className="rounded-full p-1 border border-black/10 dark:border-white/10 gap-1 flex">
        {options.map((option) => (
          <button
            key={option.id}
            className="px-3 py-1 rounded-full relative"
            ref={(el: HTMLButtonElement) => {
              optionRefs.current[option.id] = el;
            }}
            onClick={() => {
              setSelected(option.id);
              onSelect(option.id);
            }}
          >
            {option.label}
            {selected === option.id && (
              <motion.div
                className="rounded-full absolute bg-theme-300 w-full h-full left-0 top-0 -z-10"
                transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
                layoutId="selector"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
