'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Profile, UserContext, userContext } from './context';
import supabase from '@/utils/supabase';
import { User } from '@supabase/supabase-js';

interface UserProviderProps {
  children: ReactNode;
}

async function fetchProfile(user: User) {
  const req = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (req.error) {
    throw req.error;
  }
  return req.data as Profile;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setProfile(await fetchProfile(session.user));
        setUser(session.user);
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Optionally, listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setProfile(await fetchProfile(session.user));
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const signin = useCallback<UserContext['signin']>(async (email, password) => {
    const req = await supabase.auth.signInWithPassword({ email, password });
    if (req.data.user) {
      if (req.data.user) {
        setProfile(await fetchProfile(req.data.user));
        setUser(req.data.user);
      } else {
        setUser(null);
      }
    }
    return req;
  }, []);

  const signout = useCallback(() => {
    setUser(null);
    setProfile(null);
    supabase.auth.signOut();
  }, []);

  return (
    <userContext.Provider value={{ user, profile, signin, signout }}>
      {children}
    </userContext.Provider>
  );
}
