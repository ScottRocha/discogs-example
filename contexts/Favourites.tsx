'use client';

import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext
} from 'react';

import qs from 'qs';
import useSWR from 'swr';

import { AuthContext } from './Auth';

interface FavouritesContextType {
  favourites: any[];
  addFavourite: (master_id: number) => void;
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  addFavourite: () => {}
});

const fetcher = (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => fetch(input, init).then((res) => res.json());

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const { username, loginPrompt } = useContext(AuthContext);

  const [queuedFavourite, setQueuedFavourite] = useState<number | null>(null);

  const { data, mutate } = useSWR(
    username
      ? `/api/favourites?${qs.stringify({
          username
        })}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (username && queuedFavourite) {
      addFavourite(queuedFavourite);
      setQueuedFavourite(null);
    }
  }, [username, queuedFavourite]);

  const addFavourite = async (master_id: number) => {
    if (username) {
      await fetch(`/api/favourite`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          master_id
        })
      });

      mutate();
    } else {
      loginPrompt();
      setQueuedFavourite(master_id);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites: data?.results || [],
        addFavourite
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
