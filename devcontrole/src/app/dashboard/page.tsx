'use client'
import Header_DashBoard from '@/components/Header_DashBoard/Header_DashBoard'
import ModalDelete from '@/components/Modal/ModalDelete';
import ModalDetail from '@/components/Modal/ModalDetail';
import React from 'react'


const Dashboard = () => {

  return (
    <div className='px-6'>
      <Header_DashBoard/>
      <h1 className='text-3xl font-bold'>Chamados</h1>
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
