'use client';

import React, { createContext, useEffect, useState } from 'react';
import { urlBase64ToUint8Array } from './util';
import {
  createEventSubscription,
  getEventSubscriptions,
  removeEventSubscription,
} from './api';

interface PushContextValue {
  pushSupported: boolean;
  subscribedEvents: string[];
  loadingSubscriptions: boolean;
  subscribeToEvent: (eventId: string) => void;
  unsubscribeFromEvent: (eventId: string) => void;
}

export const PushContext = createContext<PushContextValue>({
  pushSupported: false,
  subscribedEvents: [],
  loadingSubscriptions: true,
  subscribeToEvent: () => {},
  unsubscribeFromEvent: () => {},
});

export default function PushProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pushSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [subscribedEvents, setSubscribedEvents] = useState<string[]>([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);

      // Get the current subscriptions
      if (sub != null) {
        const subs = await getEventSubscriptions(sub);
        setSubscribedEvents(subs);
      }

      setLoadingSubscriptions(false);
    } catch (err) {
      console.error(err);
      alert('Please allow notifications to subscribe to events.');
      setLoadingSubscriptions(false);
    }
  }

  // Generates a push notification URL
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
  }

  // Subscribe to a specific event
  async function subscribeToEvent(eventId: string) {
    if (subscription == null) {
      await subscribeToPush();
    }

    if (subscription == null) {
      alert('Please enable push notifications to subscribe to events.');
      return;
    }

    // Send the subscription to the server
    const res = await createEventSubscription(subscription, eventId);
    if (res.error != null) {
      alert(res.error);
      return;
    }

    if (res.subscriptions != null) {
      setSubscribedEvents(res.subscriptions);
    }
  }

  async function unsubscribeFromEvent(eventId: string) {
    if (subscription == null) {
      return;
    }

    // Remove the subscription from the server
    const res = await removeEventSubscription(subscription, eventId);

    if (res.error != null) {
      alert(res.error);
      return;
    }

    if (res.subscriptions != null) {
      setSubscribedEvents(res.subscriptions);
    }
  }

  return (
    <PushContext.Provider
      value={{
        pushSupported,
        loadingSubscriptions,
        subscribedEvents,
        subscribeToEvent,
        unsubscribeFromEvent,
      }}
    >
      {children}
    </PushContext.Provider>
  );
}
