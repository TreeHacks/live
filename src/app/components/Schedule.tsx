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
  date: string;
  time: string;
}

function ScheduleItem({
  id,
  title,
  description,
  location,
  href,
  date,
  time,
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

  return (
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-black dark:bg-white absolute -left-5 top-2.5" />
      <div className="text-lg">
        <span className="font-semibold">{date}</span> — {time}
        <div className="text-sm absolute right-0 top-0 flex gap-2">
          {!pushSupported ? (
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
          )}
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

export default React.memo(function Schedule() {
  const { schedule } = useContext(ScheduleContext);

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

  const events = React.useMemo(
    () =>
      (scheduleFilter === 'upcoming' ? upcomingEvents : pastEvents).map(
        (event) => {
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
              id={event.id}
              title={event.title}
              description={event.description}
              date={dayOfWeek}
              time={time}
              location={event.location}
            />
          );
        }
      ),
    [scheduleFilter, upcomingEvents, pastEvents]
  );

  return (
    <div>
      <SegmentedControl
        options={[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' },
        ]}
        onSelect={setScheduleFilter}
      />
      <div className="flex flex-col gap-4 mt-4 p-4 border-l border-black/20 dark:border-white/20">
        <ScheduleItem
          id="test"
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
  );
});
