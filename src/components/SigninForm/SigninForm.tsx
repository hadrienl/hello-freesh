'use client';

import { useUser } from '@/providers/User';
import { useCallback, useState } from 'react';
import styles from './signin-form.module.scss';
import supabase from '@/utils/supabase';

export default function SigninForm() {
  const { user, profile, signin } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = useCallback(async () => {
    setError('');
    const { error } = await signin(email, password);
    if (error) {
      setError(error.message);
    }
  }, [email, password]);
  console.log(user);
  if (profile) return <div>Bonjour {profile?.first_name}</div>;

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
