import { useEffect, useState } from "react";

const useLocalStorage = (key: string, defaultValue?: unknown) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue),
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  const clearValue = () => {
    if (value) {
      setValue(null);
      localStorage.removeItem(key);
    }
  };

  return [value, setValue, clearValue];
};

export default useLocalStorage;
