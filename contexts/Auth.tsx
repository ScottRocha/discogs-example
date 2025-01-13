'use client';

import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import { AUTH_COOKIE_EXPIRY, AUTH_COOKIE_NAME } from '@/constants';

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input
} from '@nextui-org/react';

interface AuthContextType {
  username: string | null;
  loginPrompt: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  loginPrompt: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  const [pendingUsername, setPendingUsername] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setUsername(getCookie(AUTH_COOKIE_NAME) || null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        loginPrompt: () => onOpen(),
        logout: () => {
          deleteCookie(AUTH_COOKIE_NAME);
          setUsername(null);
        }
      }}
    >
      {children}
      <Modal size={'xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
              <ModalBody>
                <Input
                  classNames={{
                    label: 'truncate'
                  }}
                  label='Username'
                  fullWidth
                  value={pendingUsername}
                  onValueChange={(value) => {
                    setPendingUsername(value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button
                  onPress={() => {
                    onClose();

                    setCookie(AUTH_COOKIE_NAME, pendingUsername, {
                      expires: new Date(Date.now() + AUTH_COOKIE_EXPIRY)
                    });
                    setUsername(pendingUsername);
                    setPendingUsername('');
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </AuthContext.Provider>
  );
};
