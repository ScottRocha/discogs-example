'use client';

import React, { useContext } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link
} from '@nextui-org/react';

import { AuthContext } from '@/contexts/Auth';
import { FavouritesContext } from '@/contexts/Favourites';

import AuthButton from './AuthButton';

export default () => {
  const { username } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);

  return (
    <Navbar>
      <NavbarBrand>
        <p className='font-bold text-inherit'>Discogs Example</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/'>
            Albums
          </Link>
        </NavbarItem>
        {!!username && !!favourites?.length && (
          <NavbarItem>
            <Link color='foreground' href='/favourites'>
              Favourites
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
