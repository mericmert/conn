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
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className} text-gray-600`}>
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
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/about">About us</Link></li>
        </ul>
        <div className='flex gap-x-4'>
          <Link href="/login">
            <button className='bg-[#2DA7FB] bg-gradient-to-l from-blue-600 w-28 h-10 rounded-2xl text-slate-100 shadow-lg shadow-blue-400'>Join Us</button>
          </Link>
          {session && <button onClick={handleLogout}><LogoutIcon fontSize='medium'/></button>}
        </div>
      </nav>
      <div className='hero w-full'>
        <div className='min-h-[645px] px-[20vh] flex flex-col justify-center items-center md:items-start md:flex-row'>
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
              <span className=' text-4xl md:text-5xl block mb-2 font-sans font-extrabold'>Connect, Collaborate<br/>and Create:</span>
              <span className='text-slate-500 font-medium font-sans'>Unleash Your Productivity with <span className='text-[#2DA7FB] font-semibold'>Conn!</span></span>
            </h1>
            <br/>
            <h2 className='swift-up-text tracking-tight text-slate-400 text-lg'>An innovative social platform that empowers you to collaborate effortlessly, supercharge your productivity, and unlock your creative potential through seamless project collaboration and note sharing.</h2>
            <br/>
            <div className='flex gap-x-5 justify-center md:justify-start'>
              <button className='bg-[#2DA7FB] bg-gradient-to-l from-blue-600 w-32 h-10 rounded-lg text-slate-100 shadow-lg shadow-blue-400'>Try now</button>
              <button className='w-32 h-10 border-2 border-slate-500 rounded-lg shadow-lg shadow-gray-400'>Community</button>
            </div>
          </div>
        </div>
        <div className='h-[300px] bg-blue-600 px-6 mt-6'>
          <div className='relative flex flex-col gap-y-6 items-center h-full w-full py-16'>
            <h1 className='text-white text-5xl font-bold'>Share Your Notes</h1>
            <span className='text-white text-lg text-center'>&#34;Earn credits to unlock exciting opportunities for further exploration.&#34;</span>
            <div className='absolute flex justify-center items-center left-[10vw] rounded-[10px] top-64 xl:top-48 w-[380px] h-[213px] bg-white rotate-[10deg] xl:rotate-[40deg]'>
              <Image
              src="/profile-picture.png"
              alt="logo"
              fill={true}
              style={{borderRadius : "10px"}}
              />
            </div>
            <div className='absolute flex justify-center items-center left-[10vw] rounded-[10px] top-64 xl:top-48 w-[380px] h-[213px] bg-white rotate-[0deg] xl:rotate-[30deg]'>
              <Image
              src="/profile-picture.png"
              alt="logo"
              fill={true}
              style={{borderRadius : "10px"}}
              />
            </div>
            <div className='absolute flex justify-center items-center left-[10vw] rounded-[10px] top-64 xl:top-48 w-[380px] h-[213px] bg-white rotate-[-10deg] xl:rotate-[20deg]'>
              <Image
              src="/profile-picture.png"
              alt="logo"
              fill={true}
              style={{borderRadius : "10px"}}
              />
            </div>
            <div className='donut absolute bottom-[0px] lg:bottom-[-32px] right-32 h-16 w-16 flex items-center justify-center border-[12px] border-orange-500 rounded-full'>
            </div>
          </div>
        </div>
        <div className='bg-[#FEFDFD] px-6 mt-64 lg:mt-48 w-full  flex flex-col items-center gap-y-6'>
          <h1 className='text-5xl font-bold'>Create your team</h1>
          <div className='max-w-[600px] text-center'>
            <span>&#34;Build your perfect team and collaborate effortlessly. Our platform matches you with like-minded individuals based on your preferences, enabling you to work together smoothly and achieve remarkable outcomes.&#34;</span>
          </div>
          <div className='mt-8 w-full flex justify-evenly flex-wrap gap-y-6'>
            <div className='h-72 bg-white w-72 shadow-xl'></div>
            <div className='h-72 bg-white w-72 shadow-xl'></div>
            <div className='h-72 bg-white w-72 shadow-xl'></div>
            <div className='h-72 bg-white w-72 shadow-xl'></div>
          </div>
        </div>
      </div>
      <footer className='p-12 w-full min-h-[30vh] mt-16 bg-blue-600 flex justify-center gap-x-32 text-white'>
        <div className='flex justify-center items-center'>
          <h1>Orta Mah. Üniversite Cad. Sabancı University</h1>
        </div>
        <div className='w-96 flex flex-col gap-y-4 justify-center items-center'>
          <Image
              src="/connlogo.png"
              alt="logo"
              width={128}
              height={128}
          />
          <span className='text-center'>All rights are reserved.</span>
        </div>
        <div className='w-48'>
          <ul className='h-full flex flex-col items-center justify-center gap-y-4'>
            <span className='font-bold text-xl'>Links</span>
            <li>About</li>
            <li>Contact</li>
            <li>Services</li>
          </ul>
        </div>
      </footer>
      
    </main>
  )
}
