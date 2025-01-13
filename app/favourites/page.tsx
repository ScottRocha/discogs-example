'use client';

import React, { useContext } from 'react';

import MasterCards from '@/components/MasterCards';
import { FavouritesContext } from '@/contexts/Favourites';

const Root = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <>
      <MasterCards masters={favourites} />
    </>
  );
};

export default Root;
