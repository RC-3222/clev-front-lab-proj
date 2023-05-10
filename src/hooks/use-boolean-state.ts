import { useCallback, useState } from 'react';

export const useBooleanState = (initState = false) => {
  const [state, setState] = useState(initState);

  const toggle = useCallback(() => {
    setState(prev => !prev);
  }, []);
  const setTrue = useCallback(() => {
    setState(true);
  }, []);
  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return { state, setTrue, setFalse, toggle };
};
