import styles from './page.module.css';
import SigninForm from '@/components/SigninForm/SigninForm';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{t('home.title')}</h1>
        <h2>{t('home.description')}</h2>
        <SigninForm />
      </main>
    </div>
  );
}
