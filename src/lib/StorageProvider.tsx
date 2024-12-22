'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export enum StoreData {
  PWAPopoutDismissed = 'PWAPopoutDismissed',
}

interface StoreTypes {
  [StoreData.PWAPopoutDismissed]: boolean;
}

const defaultStorage: StoreTypes = {
  [StoreData.PWAPopoutDismissed]: false,
};

interface LocalStorageStore {
  value: boolean;
}

export const StorageContext = createContext<{
  storage: StoreTypes;
  setStorage: Dispatch<SetStateAction<StoreTypes>>;
}>({ storage: defaultStorage, setStorage: () => null });

export function useStorage(
  key: StoreData,
): [boolean, (value: boolean) => void] {
  const { storage, setStorage } = useContext(StorageContext);

  function setKey(value: boolean) {
    const toStore: LocalStorageStore = { value };
    setStorage((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(key, JSON.stringify(toStore));
  }

  return [storage[key], setKey];
}

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storage, setStorage] = useState<StoreTypes>(defaultStorage);

  function fetchStorage() {
    const store = {} as Partial<StoreTypes>;
    for (const key of Object.keys(StoreData)) {
      const valueString = localStorage.getItem(key);
      const { value }: LocalStorageStore = JSON.parse(
        valueString ?? 'null',
      ) ?? { value: defaultStorage[key as StoreData] };

      store[key as StoreData] = value;
    }

    setStorage(store as StoreTypes);
  }

  useEffect(() => {
    fetchStorage();
  }, []);

  return (
    <StorageContext.Provider value={{ storage, setStorage }}>
      {children}
    </StorageContext.Provider>
  );
}
