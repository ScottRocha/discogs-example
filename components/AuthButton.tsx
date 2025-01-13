'use client';

import React, { useContext } from 'react';

import { Button } from '@nextui-org/react';

import { AuthContext } from '@/contexts/Auth';

export default function () {
  const { username, loginPrompt, logout } = useContext(AuthContext);

  return username ? (
    <Button radius='lg' onPress={() => logout()}>
      Logout
    </Button>
  ) : (
    <Button radius='lg' onPress={() => loginPrompt()}>
      Login
    </Button>
  );
}
