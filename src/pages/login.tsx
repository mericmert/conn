import Image from "next/image"
import Link from "next/link"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { FormEvent, useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { toasterProperties } from "@/types";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useDidMountEffect from "@/lib/hooks";

export default function Login() {


    const{data : session} = useSession();
    const router = useRouter();

    useEffect(() => {
      if(session){
        toast.info('You already logged in!', toasterProperties);
        router.replace("/");
      }  
    }, []);

    useDidMountEffect(() => {
      if (session) {
        router.replace("/");
        toast.success("You logged in!", toasterProperties);
      }
    }, [session]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);


    const loginWithGoogle = async () => {
      setIsLoading(true);
      try{
        await signIn("google", {
          redirect : false,
        });
      }
      catch(e){
        toast.error("Something went wrong!", toasterProperties);
      }
      finally{
        setIsLoading(false);
      }
    }

    const handleSubmit = async (e : FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      
      await signIn("credentials", {
      redirect : false,
      email : email.current?.value,
      password : password.current?.value
      }).then(res => {
        if (res?.status == 200){
          router.replace("/");
        }
        else if (res?.status == 401) {
          toast.error("Invalid credentials! Try again.", toasterProperties);
        }
      }).catch(err => {
        console.log(err)
        toast.error("Something went wrong!", toasterProperties);
      })
      setIsLoading(false);
    }

    return (
      <main className="w-screen min-h-screen flex justify-center bg-gradient-to-tl from-blue-300 text-gray-600">
        <div className="min-w-[70vw] gap-x-8">
          <nav className="flex items-center justify-between h-32 gap-x-12 p-6">
            <Link href="/">
              <Image
                src="/connlogo.png"
                alt="company logo"
                width={96}
                height={12}
              />
            </Link>
            <Link href="/signup" className="text-center">
              <span className="font-medium">Don&#39;t you have an account? Sign up</span>
              <ArrowForwardIcon/> 
            </Link>
          </nav>
          <div className="loginBox w-full flex flex-col items-center py-10">
            <div className="text-2xl mb-5 ">Log in to your account</div>
            <button onClick={() => loginWithGoogle()} className="w-72 h-12 rounded-lg bg-[#2DA7FB] text-white flex items-center gap-x-10 mb-3">
              <div className="w-12 h-full rounded-tl-lg rounded-bl-lg bg-white flex items-center justify-center">
                <Image 
                src="/google-icon.png"
                alt="google logo"
                width={36}
                height={36}
                />
              </div>
              <div className={`w-full h-full flex items-center ${isLoading ? "pl-16" : ""}`}>
                {isLoading ? <BeatLoader color="#FFFFFF" size={8} /> : "Log in with Google"}
              </div>
            </button>
            <h1 className="mb-3">or</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-y-3">
                <div className="relative h-12 w-72">
                  <PersonIcon fontSize="medium" className="absolute left-3 top-3 z-50"/>
                  <input placeholder="Email" className="absolute h-full w-full p-2 pl-10 bg-gray-100 rounded-lg" ref={email}/>
                </div>
                <div className="relative h-12 w-72">
                  <LockIcon fontSize="medium" className="absolute left-3 top-3 z-50"/>
                  <input type="password" placeholder="Password" className="absolute h-full w-full p-2 pl-10 bg-gray-100 rounded-lg" ref={password}/>
                </div>
                <a href="#" className="text-sm text-[#2DA7FB] my-3">Don&#39;t remember your password?</a>
                <button className="w-72 h-12 bg-black text-white rounded-md">{isLoading ? <BeatLoader color="#FFFFFF" size={8} /> : "Log in"}</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
}
  