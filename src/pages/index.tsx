import Image from 'next/image'
import { Inter } from 'next/font/google'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import { toasterProperties } from '@/types';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  const router = useRouter();
  const {data : session} = useSession();

  useEffect(() => {
    if (localStorage.getItem("isLogout") === "true"){
      toast.success("You succesfully logged out!", toasterProperties);
      localStorage.removeItem("isLogout");
    }
  }, [])

  const handleLogout = async () => {
    try{
      await signOut();
      localStorage.setItem("isLogout", "true");
    }
    catch(e){
      toast.error("Something went wrong during signing out", toasterProperties);
    }
  }

  return (
    <main className={`bg-[#FEFDFD] flex min-h-screen flex-col items-center justify-between ${inter.className} text-gray-600`}>
      <nav className=' h-[12vh] w-[80vw] min-w-[500px] flex items-center justify-between px-[3vw]'>
        <Link href="/">
          <Image
            src="/connlogo.png"
            alt="logo"
            width={120}
            height={34}
          />
        </Link>
        <ul className='flex items-center gap-x-[3vw] text-sm text-center'>
          <li>Services</li>
          <li>Contact</li>
          <li>About us</li>
        </ul>
        <div className='flex gap-x-4'>
          <Link href="/login">
            <button className='bg-[#2DA7FB] bg-gradient-to-l from-blue-600 w-28 h-10 rounded-2xl text-slate-100 shadow-lg shadow-blue-400'>Join Us</button>
          </Link>
          {session && <button onClick={handleLogout}><LogoutIcon fontSize='medium'/></button>}
        </div>
      </nav>
      <div className='hero h-[88vh] w-full'>
      <div className='px-[20vh] flex flex-col justify-center items-center md:items-start md:flex-row'>
        <Image
              src="/illustration.png"
              alt="company logo"
              width={600}
              height={600}
              unoptimized={true}
              style={{objectFit : "cover", minWidth : "350px"}}
              priority
        />
        <div className='text-center md:text-left md:py-24 w-[90vw] md:w-[680px] md:min-w-[400px] p-3'>
          <h1 className='text-2xl md:text-4xl tracking-tight'>
            <span className='font-bold text-4xl md:text-5xl block mb-2'>Connect, Collaborate<br/>and Create:</span>
            <span className='text-slate-500 font-medium'>Unleash Your Productivity with <span className='text-[#2DA7FB] font-semibold'>Conn!</span></span>
          </h1>
          <br/>
          <h2 className='tracking-tight text-slate-400'>An innovative social platform that empowers you to collaborate effortlessly, supercharge your productivity, and unlock your creative potential through seamless project collaboration and note sharing.</h2>
          <br/>
          <div className='flex gap-x-5 justify-center md:justify-start'>
            <button className='bg-[#2DA7FB] bg-gradient-to-l from-blue-600 w-32 h-10 rounded-lg text-slate-100 shadow-lg shadow-blue-400'>Try now</button>
            <button className='w-32 h-10 border-2 border-slate-500 rounded-lg shadow-lg shadow-gray-400'>Community</button>
          </div>
        </div>
        
      </div>
      </div>
      
      
    </main>
  )
}
