import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children} : {children : React.ReactNode}) {
  return (
    <>
        <Head>
          <title>Conn</title>
          <meta name='description' content="conn is a modern way to collaborate!"/>  
        </Head>
        <main>{children}</main>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
    </>
  )
  //footer will be added!
}

