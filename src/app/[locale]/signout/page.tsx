'use client';

import { useUser } from '@/providers/User';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function () {
  const { signout } = useUser();
  useEffect(() => {
    signout();
    redirect('/');
  }, [signout]);
}
