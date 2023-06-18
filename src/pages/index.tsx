import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import { toasterProperties } from '@/types';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  const router = useRouter();
  const {data : session} = useSession();
  console.log(session);

  const handleLogout = async () => {
    try{
      await signOut({callbackUrl : "/login"});
    }
    catch(e){
      toast.error("Something went wrong during signing out", toasterProperties);
    }
  }
  return (
    <main className={`bg-slate-100 flex min-h-screen flex-col items-center justify-between ${inter.className} text-gray-600`}>
      <nav className=' h-[12vh] w-[80vw] min-w-[500px] flex items-center justify-between px-[3vw]'>
        <Link href="/">
          <Image
            src="/connlogo.png"
            alt="company logo"
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
    </main>
  )
}
