const DISMISSED_STORE_KEY = 'dismissibleContent';

export enum DismissibleContents {
  PWAPopoutDismissed = 'PWAPopoutDismissed',
}

interface DismissibleContentTypes {
  [DismissibleContents.PWAPopoutDismissed]: boolean;
}

const defaultDismissedStore: DismissibleContentTypes = {
  [DismissibleContents.PWAPopoutDismissed]: false,
};

function parseDismissedStore(): DismissibleContentTypes {
  const storeString = localStorage.getItem(DISMISSED_STORE_KEY);
  let store = {} as Partial<DismissibleContentTypes>;
  if (storeString != null) {
    store = JSON.parse(storeString) as Partial<DismissibleContentTypes>;
  }

  // Ensure all keys are present, no longer becomes a partial
  for (const key of Object.keys(defaultDismissedStore)) {
    if (!store[key as DismissibleContents]) {
      store[key as DismissibleContents] =
        defaultDismissedStore[key as DismissibleContents];
    }
  }

  return store as DismissibleContentTypes;
}

export function isDismissed(type: DismissibleContents) {
  return parseDismissedStore()[type];
}

export function dismiss(type: DismissibleContents) {
  const store = parseDismissedStore();
  store[type] = true;
  localStorage.setItem(DISMISSED_STORE_KEY, JSON.stringify(store));
}
