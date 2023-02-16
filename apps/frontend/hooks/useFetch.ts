import { type Dispatch, useEffect, useReducer, useRef, useState } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
  loading?: boolean;
  runFetch: (isFetch: boolean) => void;
}

type Cache<T> = Record<string, T>;

// discriminated union type
type Action<T> =
  | { type: 'loading', payload: boolean }
  | { type: 'fetched', payload: T }
  | { type: 'error', payload: Error };

export function useFetch<T = unknown>(url?: string, options?: RequestInit, useCache = false): State<T> {
  const cache = useRef<Cache<T>>({});
  const [isFetch, runFetch]: [boolean, Dispatch<boolean>] = useState(false);

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
    runFetch
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, loading: action.payload };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!isFetch || !url) return;
    runFetch(false);

    cancelRequest.current = false;

    const fetchData = async (): Promise<void> => {
      dispatch({ type: 'loading', payload: true });

      // If a cache exists for this url, return it
      if (useCache && cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'loading', payload: false });
        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'loading', payload: false });
        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      // cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetch]);

  return state;
}
