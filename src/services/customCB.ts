import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useCustomCB = (init: string) => {
  const [state, setState] = useState(init);
  const cbRef: MutableRefObject<Function | null> = useRef(null);

  const update = useCallback((newState: Function | string, cb: Function): void => {
    cbRef.current = cb;
    setState((prev: Function | string): string => typeof newState === 'function' ? newState(prev) : newState);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    };
  }, [state]);

  return [state, update];
};
