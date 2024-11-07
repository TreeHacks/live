'use client';

import { faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpFromBracket,
  faEllipsisVertical,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PWAContext } from './PWAProvider';
import { useContext } from 'react';

function PWAOnboarding({ isIOS }: { isIOS: boolean }) {
  return (
    <div className="inset-0 fixed">
      <div className="m-2 py-8 px-6 rounded-lg bg-theme-300 border-theme-400 border">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">Welcome to TreeHacks!</h1>
          <div className="mt-6">
            <p>Please follow these steps below to install the app. </p>
            <p className="mt-2">
              Installing the app allows us to send you notifications for events
              and announcements.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          {isIOS ? (
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-md border-theme-400 border-2 h-12 w-12">
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">Tap the share icon below.</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-md border-theme-400 border-2 h-12 w-12">
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
                <div className="flex items-center justify-center rounded-md border-theme-400 border-2 h-12 w-12">
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
                <div className="flex items-center justify-center rounded-md border-theme-400 border-2 h-12 w-12">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="flex-grow"
                    size="lg"
                  />
                </div>
                <div className="font-medium">Tap the three-dot icon</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-md border-theme-400 border-2 h-12 w-12">
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
      </div>
    </div>
  );
}

export default function Home() {
  const { isLoading, isPopupDismissed, isIOS, isStandalone, isMobile } =
    useContext(PWAContext);

  return (
    <div>
      {!isLoading && !isPopupDismissed && !isStandalone && isMobile ? (
        <PWAOnboarding isIOS={isIOS} />
      ) : null}
    </div>
  );
}
