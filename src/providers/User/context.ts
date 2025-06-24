'use client'

import { AuthTokenResponsePassword, User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export interface UserContext {
  user: User|null;
  signin: (email: string, password: string) => Promise<AuthTokenResponsePassword>
}

export const userContext = createContext<UserContext | undefined>(undefined)
export function useUser  ()  {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('user context not found');
  }
  return context
}
