'use client'
import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";


const ShowModal = ({id} : { id: string }) => {
  return <button onClick={() => (document.getElementById(`my_modal_${id+1}`) as HTMLDialogElement)?.showModal()}><RiDeleteBin5Line className='text-red-500 hover:scale-125 duration-500' size={20}/></button>
}

export default ShowModal
