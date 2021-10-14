import { useCallback, useEffect, useRef, useState } from 'react';

export const useCustomCB = (init) => {
  const [state, setState] = useState(init);
  const cbRef = useRef();

  const update = useCallback((newState, cb) => {
    cbRef.current = cb;
    setState((prev) => typeof newState === 'function' ? newState(prev) : newState);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    };
  }, [state]);

  return [state, update];
};
