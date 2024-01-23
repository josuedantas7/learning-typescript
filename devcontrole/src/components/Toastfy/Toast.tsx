'use client'
import React, { useEffect } from 'react';

import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast({type,message} : {type: string, message: string}){

    const notify = () => toast(message, {type: type as TypeOptions});

  useEffect(() => {
    const notify = () => toast(message, {type: type as TypeOptions});
    notify()
  },[message,type])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}