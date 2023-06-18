import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';



/*function Loading(){


  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const handleStart = (url : any) => (url !== router.asPath) && setIsLoading(true);
    const handleComplete = (url : any) => (url === router.asPath) && setIsLoading(false);
    
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);


    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  });
  console.log(isLoading);
  
  return isLoading ? (
    <div className='spinner-wrapper fixed bg-white h-screen w-screen left-0 top-0 flex justify-center items-center'>
      <BeatLoader size={12}/>
    </div>
  ) : <></>

}
*/

export default function App({ Component, pageProps }: AppProps) {  
  return(
    <> 
  <Head>
    <title>Conn!</title>
    <meta name='description' content='A new way to collaborate!'/>
  </Head>
  <SessionProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
  </>
  )
}
