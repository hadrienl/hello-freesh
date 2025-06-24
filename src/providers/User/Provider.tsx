'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import {UserContext, userContext} from './context'
import supabase from '@/utils/supabase';
import { User } from '@supabase/supabase-js';

interface UserProviderProps {
  children: ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    // Optionally, listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signin = useCallback<UserContext['signin']>(async (email, password) => {
    const req = await supabase.auth.signInWithPassword({ email, password })
    if (req.data.user) {
      setUser(user)
    }
    return req
  }, [])

  return <userContext.Provider value={{user, signin}}>{children}</userContext.Provider>
}
