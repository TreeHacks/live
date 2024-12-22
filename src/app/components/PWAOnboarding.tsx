'use client';

import { PWAContext } from '@/lib/PWAProvider';
import { StoreData, useStorage } from '@/lib/StorageProvider';
import { faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpFromBracket,
  faEllipsisVertical,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export default function PWAOnboarding() {
  const { isLoading, isIOS, isStandalone, isMobile } = useContext(PWAContext);
  const [isPopupDismissed, setDismissed] = useStorage(
    StoreData.PWAPopoutDismissed,
  );
  const showPWAOnboarding =
    !isLoading && !isPopupDismissed && !isStandalone && isMobile;

  return showPWAOnboarding ? (
    <div className="fixed inset-0 z-10 backdrop-blur-sm">
      <div className="m-2 rounded-lg border border-theme-400 bg-theme-300 px-6 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome to TreeHacks!</h1>
          <div className="mt-6">
            <p className="">
              Please install the TreeHacks app so we can notify you about events
              an announcements throughout the hackathon!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          {isIOS ? (
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-theme-400">
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">Tap the share icon below.</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-theme-400">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">
                  Press &quot;Add to home screen&quot;.
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-theme-400">
                  <FontAwesomeIcon
                    icon={faChrome}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">
                  Open this site on Android Chrome
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-theme-400">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">Tap the three-dot icon</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-theme-400">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">
                  Press &apos;Add to Home screen&apos;
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="underline opacity-80"
            onClick={() => setDismissed(true)}
          >
            No thanks.
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
