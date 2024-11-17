'use client';

import { faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpFromBracket,
  faBell,
  faEllipsisVertical,
  faExternalLink,
  faLocationDot,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PWAContext } from '../lib/PWAProvider';
import { useContext } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { ScheduleContext } from '@/lib/ScheduleProvider';
import Image from 'next/image';

function PWAOnboarding({ isIOS }: { isIOS: boolean }) {
  return (
    <div className="inset-0 fixed z-10">
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

interface CircleButtonProps {
  onClick?: () => void;
  href?: string;
  icon: IconProp;
}

interface ScheduleItemProps {
  title: string;
  description?: string;
  location?: string;
  href?: string;
  date: string;
  time: string;
}

function CircleButton({ onClick, href, icon }: CircleButtonProps) {
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

function ScheduleItem({
  title,
  description,
  location,
  href,
  date,
  time,
}: ScheduleItemProps) {
  return (
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-black dark:bg-white absolute -left-5 top-2.5" />
      <div className="text-lg">
        <span className="font-semibold">{date}</span> — {time}
        <div className="text-sm absolute right-0 top-0 flex gap-2">
          <CircleButton icon={faBell} />
          {href != null ? (
            <CircleButton icon={faExternalLink} href={href} />
          ) : null}
        </div>
      </div>
      <div className="mt-2 rounded-xl border bg-theme-200 border-black/10 dark:border-white/10">
        <div className="p-3">
          <div className="font-semibold text-lg">{title}</div>
          <div className="mt-1 text-black/90 dark:text-white/90">
            {description || 'Welcome to TreeHacks 2025! Test test'}
          </div>
          <div className="mt-1 text-black/80 dark:text-white/80">
            <FontAwesomeIcon icon={faLocationDot} /> {location || 'TBD'}
          </div>
        </div>
      </div>
    </div>
  );
}

import headerImage from './assets/event-stairs-2024.jpg';

export default function Home() {
  const { isLoading, isPopupDismissed, isIOS, isStandalone, isMobile } =
    useContext(PWAContext);

  const { schedule } = useContext(ScheduleContext);
  const events = schedule.map((event) => {
    const date = Date.parse(event.start_time);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    // Get the time formatted like this: 8:00 AM
    const time = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    return (
      <ScheduleItem
        key={event.id}
        title={event.title}
        description={event.description}
        date={dayOfWeek}
        time={time}
        location={event.location}
      />
    );
  });

  return (
    <div>
      {!isLoading && !isPopupDismissed && !isStandalone && isMobile ? (
        <PWAOnboarding isIOS={isIOS} />
      ) : null}
      <div className="h-[60vh] md:h-[55vh] relative">
        <Image
          src={headerImage}
          className="w-full h-full object-cover object-top absolute top-0 -z-10 pointer-events-none"
          alt="Big block letters of TreeHacks 2024"
        />
        <div className="z-10 pt-28 px-12 max-w-5xl mx-auto">
          <div className="rounded-xl border border-black/10 dark:border-white/10 flex-shrink p-4 backdrop-blur-md bg-gray-900/20 text-center">
            <div className="text-8xl font-bold">00:00:00:00</div>
            <div className="font-medium text-3xl">until hacking begins</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto mt-12">
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">TreeHacks Schedule</h1>
          <div className="flex mt-4">
            <div className="rounded-full p-1 border border-black/10 dark:border-white/10 gap-1 flex">
              <button className="px-2 py-1 rounded-full bg-theme-300">
                Upcoming
              </button>
              <button className="px-2 py-1 rounded-full">Past</button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 p-4 border-l border-black/20 dark:border-white/20">
            <ScheduleItem
              title="Test Event"
              description="An event for testing things."
              date="Friday"
              time="8:00 AM"
              href="https://google.com"
              location="Hewlett 200"
            />
            {events}
          </div>
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
