'use client';

import React, { Suspense } from 'react';

import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

import { AuthProvider } from '@/contexts/Auth';
import { FavouritesProvider } from '@/contexts/Favourites';

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  const router = useRouter();

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <AuthProvider>
        <FavouritesProvider>
          <Suspense>{children}</Suspense>
        </FavouritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
