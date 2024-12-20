'use client';

import { faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpFromBracket,
  faEllipsisVertical,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PWAContext } from '../lib/PWAProvider';
import { useContext } from 'react';
import Countdown from './components/Countdown';
import Schedule from './components/Schedule';
import { StoreData, useStorage } from '@/lib/StorageProvider';
import HeaderArt from './components/HeaderArt';

function PWAOnboarding({ isIOS }: { isIOS: boolean }) {
  const [_, setKey] = useStorage(StoreData.PWAPopoutDismissed);

  return (
    <div className="inset-0 fixed z-10 backdrop-blur-sm">
      <div className="m-2 py-8 px-6 rounded-lg bg-theme-300 border-theme-400 border">
        <div className="text-center">
          <h1 className="font-semibold text-3xl">Welcome to TreeHacks!</h1>
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
        <div className="flex items-center justify-center mt-4">
          <button className="underline opacity-80" onClick={() => setKey(true)}>
            No thanks.
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { isLoading, isIOS, isStandalone, isMobile } = useContext(PWAContext);
  const [isPopupDismissed] = useStorage(StoreData.PWAPopoutDismissed);
  const showPWAOnboarding =
    !isLoading && !isPopupDismissed && !isStandalone && isMobile;

  return (
    <div>
      {showPWAOnboarding ? <PWAOnboarding isIOS={isIOS} /> : null}
      <div className="h-[35vh] md:h-[65vh] relative">
        <HeaderArt />
        <div className="w-screen h-full flex items-center justify-center text-white dark:bg-black/50">
          <div className="text-center my-24">
            <div className="text-5xl md:text-9xl font-semibold font-mono">
              <Countdown />
            </div>
            <div className="font-medium text-2xl md:text-4xl">
              until hacking begins
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto sm:mt-12 mt-6">
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">TreeHacks Schedule</h1>
          <Schedule />
        </div>
        <div className="col-span-1">
          <h1 className="text-3xl font-semibold">Welcome!</h1>
          <p className="mt-2">
            This is your home for all things TreeHacks 2025. Click the bell icon
            next to some events on the left to be notified when they happen!
            Install the web app on your phone for the best experience. Below,
            you&apos;ll find a curated list of resources to get you started on a
            project.
          </p>
        </div>
      </div>
    </div>
  );
}
