import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getStorageValue = (key: string, defaultValue?: any) => {
  const savedItem = localStorage.getItem(key);
  const parsedItem = savedItem ? JSON.parse(savedItem) : null;
  return parsedItem || defaultValue;
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: any
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
