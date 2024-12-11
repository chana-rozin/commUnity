"use client"
import { useRouter } from 'next/navigation';
import Head from 'next/head';

import ComingSoon from "@/components/ComingSoon/ComingSoon";
import useUserStore from '@/stores/userStore';
import { useEffect } from 'react';
export default function Home() {

  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user)
      router.push('/login');
    else
      router.push(`/forum/${user.neighborhoodId}`);
  }, [user])

  return (<>
    <Head>
      <title>commUnity</title>
    </Head>

    <ComingSoon />
  </>
  );
}
