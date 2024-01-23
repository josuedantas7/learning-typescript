'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";


const BotaoVoltar = () => {
    const router = useRouter()

    return (
      <button className='text-white flex items-center bg-purple-900 rounded-lg pl-1 pr-2 py-1' onClick={() => router.back()}><MdKeyboardDoubleArrowLeft size={20}/><p>Voltar</p></button>
    )
}

export default BotaoVoltar
