'use client';

import { createContext, useEffect, useState } from 'react';

interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  tags: string[];
  updated_at: string;
}

interface ScheduleContextValue {
  schedule: ScheduleItem[];
  isLoading: boolean;
  fetchFailed: boolean;
}

export const ScheduleContext = createContext<ScheduleContextValue>({
  schedule: [],
  isLoading: true,
  fetchFailed: false,
});

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);

  async function fetchData() {
    const data = await fetch(process.env.NEXT_PUBLIC_SCHEDULE_API_URL!)
      .then((res) => res.json())
      .catch(() => null);

    if (data != null) {
      setSchedule(data);
      setIsLoading(false);
    } else {
      if (schedule.length === 0) {
        setFetchFailed(true);
      }
    }
  }

  useEffect(() => {
    fetchData();

    // Update the events list every minute
    const interval = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScheduleContext.Provider value={{ schedule, isLoading, fetchFailed }}>
      {children}
    </ScheduleContext.Provider>
  );
}
