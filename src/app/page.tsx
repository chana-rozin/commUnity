"use client"
import { useRouter } from 'next/navigation';
import Head from 'next/head';

import ComingSoon from "@/components/ComingSoon/ComingSoon";
export default function Home() {

  return (<>
    <Head>
      <title>commUnity</title>
    </Head>

    <ComingSoon />
  </>
  );
}
