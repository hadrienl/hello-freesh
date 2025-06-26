'use client';

import { AuthTokenResponsePassword, User } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export interface Profile {
  first_name: string;
  last_name: string;
}

export interface UserContext {
  user: User | null;
  signin: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword>;
  signout: () => void;
  profile: Profile | null;
}

export const userContext = createContext<UserContext | undefined>(undefined);
export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('user context not found');
  }
  return context;
}
