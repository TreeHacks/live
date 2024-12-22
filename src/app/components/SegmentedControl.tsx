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

  return (
    <div className="flex-shrink">
      <div className="flex gap-1 rounded-full border border-black/10 p-1 dark:border-white/10">
        {options.map((option) => (
          <button
            key={option.id}
            className="relative rounded-full px-3 py-1"
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
                className="absolute left-0 top-0 -z-10 h-full w-full rounded-full bg-theme-300"
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
