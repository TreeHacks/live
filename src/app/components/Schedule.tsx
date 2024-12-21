import React, { useContext, useState } from 'react';
import SegmentedControl from './SegmentedControl';
import CircleButton from './CircleButton';
import {
  faBell,
  faCheck,
  faCircleNotch,
  faExternalLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScheduleContext } from '@/lib/ScheduleProvider';
import { PushContext } from '@/lib/PushProvider';
import { StoreData, useStorage } from '@/lib/StorageProvider';

interface ScheduleItemProps {
  id: string;
  title: string;
  description?: string;
  location?: string;
  href?: string;
  startTime: string;
  endTime: string;
}

function ScheduleItem({
  id,
  title,
  description,
  location,
  href,
  startTime,
  endTime,
}: ScheduleItemProps) {
  const {
    subscribedEvents,
    subscribeToEvent,
    unsubscribeFromEvent,
    loadingSubscriptions,
    pushSupported,
  } = useContext(PushContext);
  const [_, setKey] = useStorage(StoreData.PWAPopoutDismissed);

  const isSubscribed = subscribedEvents.includes(id);
  const [loading, setLoading] = useState(false);

  async function pressNotify() {
    setLoading(true);
    if (isSubscribed) {
      await unsubscribeFromEvent(id);
    } else {
      await subscribeToEvent(id);
    }
    setLoading(false);
  }

  const startDate = Date.parse(startTime);
  const endDate = Date.parse(endTime);
  const dayOfWeek = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(startDate);
  const startClock = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(startDate);
  const endClock = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(endDate);
  const isHappeningNow =
    Date.now() >= Date.parse(startTime) && Date.now() <= Date.parse(endTime);
  const isPrevious = Date.now() > Date.parse(endTime);

  return (
    <div className="relative">
      <div
        className={`w-2 h-2 rounded-full absolute -left-5 top-2.5 ${
          isHappeningNow ? 'bg-red-600' : 'bg-black dark:bg-white'
        }`}
      />
      <div className="text-lg">
        <span
          className={`font-semibold ${
            isHappeningNow ? 'text-red-600 animate-pulse' : ''
          }`}
        >
          {isHappeningNow ? 'Happening Now' : dayOfWeek}
        </span>{' '}
        — {startClock} to {endClock}
        <div className="text-sm absolute right-0 top-0 flex gap-2">
          {!(isHappeningNow || isPrevious) ? (
            !pushSupported ? (
              <CircleButton icon={faBell} onClick={() => setKey(false)}>
                Install App
              </CircleButton>
            ) : loading || loadingSubscriptions ? (
              <CircleButton icon={faCircleNotch} iconClassName="animate-spin" />
            ) : (
              <CircleButton
                icon={isSubscribed ? faCheck : faBell}
                onClick={() => pressNotify()}
              >
                {isSubscribed ? 'Subscribed' : 'Notify'}
              </CircleButton>
            )
          ) : null}
          {href != null ? (
            <CircleButton icon={faExternalLink} href={href} />
          ) : null}
        </div>
      </div>
      <div
        className={`mt-2 rounded-xl border border-black/10 dark:border-white/10 ${
          isHappeningNow ? 'bg-red-600/20 shine' : 'bg-theme-200'
        }`}
      >
        <div className="p-3">
          <div className="font-semibold text-lg">{title}</div>
          <div className="mt-1 text-black/90 dark:text-white/90">
            {description}
          </div>
          <div className="mt-1 text-black/80 dark:text-white/80">
            <FontAwesomeIcon icon={faLocationDot} /> {location || 'TBD'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(function Schedule() {
  const { schedule } = useContext(ScheduleContext);
  const { subscribedEvents: subscribedEventIds } = useContext(PushContext);

  const [scheduleFilter, setScheduleFilter] = useState('upcoming');

  const [throttledNow, setNow] = useState(() => Date.now());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const upcomingEvents = React.useMemo(
    () =>
      schedule.filter((event) => Date.parse(event.end_time) >= throttledNow),
    [schedule, throttledNow]
  );
  const pastEvents = React.useMemo(
    () => schedule.filter((event) => Date.parse(event.end_time) < throttledNow),
    [schedule, throttledNow]
  );
  const subscribedEvents = React.useMemo(
    () => schedule.filter((event) => subscribedEventIds.includes(event.id)),
    [schedule, subscribedEventIds]
  );

  const events = React.useMemo(
    () =>
      (scheduleFilter === 'upcoming'
        ? upcomingEvents
        : scheduleFilter === 'subscribed'
        ? subscribedEvents
        : pastEvents
      ).map((event) => (
        <ScheduleItem
          key={event.id}
          id={event.id}
          title={event.title}
          description={event.description}
          startTime={event.start_time}
          endTime={event.end_time}
          location={event.location}
        />
      )),
    [scheduleFilter, upcomingEvents, pastEvents, subscribedEvents]
  );

  return (
    <div>
      <SegmentedControl
        options={[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Previous' },
          { id: 'subscribed', label: 'Subscribed' },
        ]}
        onSelect={setScheduleFilter}
      />
      <div className="flex flex-col gap-4 mt-4 p-4 border-l border-black/20 dark:border-white/20">
        {events}
        {events.length === 0 ? (
          <div className="text-black/60 dark:text-white/60 text-center">
            No {scheduleFilter} events to show.
          </div>
        ) : null}
      </div>
    </div>
  );
});
