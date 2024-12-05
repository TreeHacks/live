'use client';

import { isMobileBrowser } from '@/lib/util';
import React, { createContext, useEffect, useState } from 'react';

interface PWAContextValue {
  isIOS: boolean;
  isStandalone: boolean;
  isLoading: boolean;
  isMobile: boolean;
}

export const PWAContext = createContext<PWAContextValue>({
  isIOS: false,
  isStandalone: false,
  isLoading: true,
  isMobile: false,
});

export default function PWAProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    setIsLoading(false);
    setIsMobile(isMobileBrowser());
  }, []);

  return (
    <PWAContext.Provider value={{ isIOS, isStandalone, isLoading, isMobile }}>
      {children}
    </PWAContext.Provider>
  );
}
