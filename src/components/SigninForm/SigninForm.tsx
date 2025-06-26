'use client';

import { useUser } from '@/providers/User';
import { useCallback, useState } from 'react';
import styles from './signin-form.module.scss';
import supabase from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';

export default function SigninForm() {
  const { push } = useRouter();
  const { profile, signin } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = useCallback(async () => {
    setError('');
    const { error } = await signin(email, password);
    if (error) {
      setError(error.message);
      return;
    }
    setTimeout(() => push('/dashboard'), 5000);
  }, [email, password]);

  if (profile)
    return (
      <div>
        <p>Bonjour {profile?.first_name}</p>
        <Link href="/dashboard">Je vais dans mon espace</Link>
      </div>
    );

  return (
    <form
      className={styles['signin-form']}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
      />
      <button type="submit">Signin</button>
      {error}
    </form>
  );
}
