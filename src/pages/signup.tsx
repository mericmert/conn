
import Image from "next/image"
import Link from "next/link"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { toasterProperties } from "@/types";
import { signIn, useSession } from "next-auth/react";
import useDidMountEffect from "@/lib/hooks";

const emailValidationRegExp : RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;

export default function Signup() {

    const {data : session} = useSession();
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
    
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [signUpForm, setSignUpForm] = useState({
      full_name : "",
      email : "",
      password : ""
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
      setSignUpForm((prev) => ({
        ...prev,
        [event.target.name] : event.target.value
      }))        
    }

    const signUpWithGoogle = async () => {
      setIsLoading(true);
      try{
        await signIn("google", {
          redirect : false,
        })
      }
      catch(e){
        console.log(e)
        toast.error("Something went wrong!", toasterProperties);
      }
      finally{
        setIsLoading(false);
      }
    }

    const handleSubmit = useCallback(
      async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        let isError : boolean = false;
        if (!emailValidationRegExp.test(signUpForm.email)){
          //toast
          toast.error('Enter a valid e-mail address!', toasterProperties); 
            isError = true;
        }
        if (signUpForm.full_name.length < 2) {
          toast.error('Full name must be at least 2 characters!', toasterProperties); 
            isError = true;
        }
        if (signUpForm.password.length < 2) {
          toast.error('Password must be at least 2 characters!', toasterProperties); 
            isError = true;
        }
        try{
          if (!isError){
            const res = await fetch("/api/auth/register", {
              headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
              },
              method: "POST",
              body: JSON.stringify({
                full_name : signUpForm.full_name,
                email : signUpForm.email,
                password : signUpForm.password, 
              })            
            });
            if (res.status === 200) {
              toast.success("Your account has been created", toasterProperties);
              router.push("/login");
            }
            else{
              toast.error('User already exists!', toasterProperties); 
            }

            
          }
        }
        catch(e){
          toast.error('Something went wrong!', toasterProperties); 
        }
        finally{
          setIsLoading(false);
        }
      }, [router, signUpForm]
    );

    return (
      <main className="w-screen min-h-screen flex justify-center bg-gradient-to-tr from-blue-300 text-gray-600">
        <div className="min-w-[70vw] gap-x-6">
          <nav className="flex items-center justify-between h-32 gap-x-5 p-6">
            <Link href="/">
              <Image
                src="/connlogo.png"
                alt="company logo"
                width={96}
                height={12}
              />
            </Link>
            <Link href="/login" className="text-center">
              <span className="font-medium">Do you already have an account? Log in</span>
              <ArrowForwardIcon/> 
            </Link>
          </nav>
          <div className="loginBox w-full flex flex-col items-center py-10">
            <div className="text-2xl mb-5 ">Create your account</div>
            <button onClick={() => signUpWithGoogle()} className="w-72 h-12 rounded-lg bg-[#2DA7FB] text-white flex items-center mb-3">
              <div className="w-12 h-full rounded-tl-lg rounded-bl-lg bg-white flex items-center justify-center">
                <Image 
                src="/google-icon.png"
                alt="google logo"
                width={36}
                height={36}
                />
              </div>
              <div className={`w-full h-full flex items-center ${isLoading ? " pl-24 " : " pl-10 "}`}>
                {isLoading ? <BeatLoader color="#FFFFFF" size={8} /> : "Sign up with Google"}
              </div>
            </button>
            <h1 className="mb-3">or</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-y-3">
                <div className="relative h-12 w-72">
                  <PersonIcon fontSize="medium" className="absolute left-3 top-3 z-50"/>
                  <input onChange={(e) => handleChange(e)} name="full_name" placeholder="Full name" className="absolute h-full w-full p-2 pl-10 bg-gray-100 rounded-lg"/>
                </div>
                <div className="relative h-12 w-72">
                  <EmailIcon fontSize="medium" className="absolute left-3 top-3 z-50"/>
                  <input onChange={(e) => handleChange(e)} name="email" placeholder="Email" className="absolute h-full w-full p-2 pl-10 bg-gray-100 rounded-lg"/>
                </div>
                <div className="relative h-12 w-72">
                  <LockIcon fontSize="medium" className="absolute left-3 top-3 z-50"/>
                  <input onChange={(e) => handleChange(e)} name="password" type="password" placeholder="Password" className="absolute h-full w-full p-2 pl-10 bg-gray-100 rounded-lg"/>
                </div>
                <button className="w-72 h-12 bg-black text-white rounded-md mt-3">{isLoading ? <BeatLoader color="#FFFFFF" size={8} /> : "Sign up"}</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
}
  