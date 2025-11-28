import { useState, useEffect } from "react";

function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // falha silenciosa — storage cheio, privado, etc.
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
