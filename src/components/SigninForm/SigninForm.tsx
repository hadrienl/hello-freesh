'use client';

import { useUser } from '@/providers/User';
import { useCallback, useState } from 'react';
import styles from './signin-form.module.scss';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import SigninFormRender from './SigninFormRender';

export default function SigninForm() {
  const { push } = useRouter();
  const { profile, signin } = useUser();

  const [error, setError] = useState('');

  const submit = useCallback(async (email: string, password: string) => {
    setError('');
    const { error } = await signin(email, password);
    if (error) {
      setError(error.message);
      return;
    }
    setTimeout(() => push('/cuisine'), 5000);
  }, []);

  if (profile)
    return (
      <div>
        <p>Bonjour {profile?.first_name}</p>
        <Link href="/cuisine">Je vais dans mon espace</Link>
        <Link href="/signout">Déconnexion</Link>
      </div>
    );

  return <SigninFormRender onSubmit={submit} />;
}
