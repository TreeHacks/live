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
      <div className="rounded-full p-1 border border-black/10 dark:border-white/10 gap-1 flex relative">
        {options.map((option) => (
          <button
            key={option.id}
            className="px-3 py-1 rounded-full"
            ref={(el: HTMLButtonElement) => {
              optionRefs.current[option.id] = el;
            }}
            onClick={() => {
              setSelected(option.id);
              onSelect(option.id);
            }}
          >
            {option.label}
          </button>
        ))}

        <motion.div
          className="rounded-full absolute bg-theme-300 -z-10 left-0"
          transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
          animate={{
            width: selectorWidth,
            height: selectorHeight,
            x: selectorX,
          }}
          initial={false}
        />
      </div>
    </div>
  );
}
