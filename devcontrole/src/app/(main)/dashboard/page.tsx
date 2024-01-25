import ModalDelete from '@/components/Modal/ModalDelete';
import ModalDetail from '@/components/Modal/ModalDetail';
import React from 'react'

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  if(!session || !session.user){
    redirect('/')
  }

  return (
    <div className='px-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Chamados</h1>
        <Link className='px-6 py-1 rounded text-white font-bold duration-300 hover:scale-105 bg-blue-300' href={'/new_ticket'}>Abrir chamado</Link>
      </div>

      <div className='px-4 mt-6 flex justify-between font-semibold'>
        <p className='w-1/4'>CLIENTE</p>
        <p className='w-1/4 text-center'>DATA CADASTRO</p>
        <p className='w-1/4 text-center'>STATUS</p>
        <p className='w-1/4 text-end'>#</p>
      </div>
      <div className='px-4 flex justify-between bg-gray-200 py-2 rounded-md border-gray-500 border-b-[1px]'>
        <p className='w-1/4'>Josué Silva</p>
        <p className='w-1/4 text-center'>01/04/2024</p>
        <p className='w-[80px] rounded-md mx-auto text-center bg-green-300'>Aberto</p>
        <div className='w-1/4 text-end flex gap-2 justify-end'>
          <div>
            <ModalDelete/>
          </div>
          <div>
            <ModalDetail/>
            </div>
        </div>
      </div>      
      <div className='px-4 flex justify-between bg-gray-200 py-2 rounded-md border-gray-500 border-b-[1px]'>
        <p className='w-1/4'>Josué Silva</p>
        <p className='w-1/4 text-center'>01/04/2024</p>
        <p className='w-[80px] rounded-md mx-auto text-center bg-green-300'>Aberto</p>
        <div className='w-1/4 text-end flex gap-2 justify-end'>
          <div>
            <ModalDelete/>
          </div>
          <div>
            <ModalDetail/>
            </div>
        </div>
      </div>      
    </div>
  )
}

export default Dashboard
