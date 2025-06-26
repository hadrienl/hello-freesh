'use client';

import supabase from '@/utils/supabase';
import { useEffect } from 'react';

export default function ReceipesPage() {
  useEffect(() => {
    const fetch = async () => {
      const res = await supabase.from('receipes').select('*');
      console.log(res);
    };
    fetch();
  }, []);

  return <div>TEST</div>;
}
