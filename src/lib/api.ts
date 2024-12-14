const SUBSCRIPTION_API_URL = `${process.env.NEXT_PUBLIC_ROOT_URL}/api/live/event_subscriptions`;

interface SubscriptionAPIResponse {
  error?: string;
  subscriptions?: string[];
}

export function createEventSubscription(
  subscription: PushSubscription,
  eventId: string
): Promise<SubscriptionAPIResponse> {
  return fetch(SUBSCRIPTION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription,
      eventId,
    }),
  }).then((res) => res.json());
}

export function removeEventSubscription(
  subscription: PushSubscription,
  eventId: string
): Promise<SubscriptionAPIResponse> {
  return fetch(SUBSCRIPTION_API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subscription,
      eventId,
    }),
  }).then((res) => res.json());
}

export function getEventSubscriptions(
  subscription: PushSubscription
): Promise<string[]> {
  return fetch(
    SUBSCRIPTION_API_URL +
      '?' +
      new URLSearchParams({
        endpoint: subscription.endpoint,
      }),
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}
