'use client'
import React from 'react'
import { api } from '@/lib/api'
import Notification from '../Notifier/Notification';
import { useRouter } from 'next/navigation';
interface CustomerProps{
    name: string;
    phone: string;
    email: string;
    id: string;
}

const CardCostumer = ({name,phone,email,id} : CustomerProps) => {


  const router = useRouter()

  async function handleDeleteCustomer(){
    try{
      await api.delete(`/api/customer`, {
        params: {
          id: id
        }
      })
      Notification('success', 'Cliente deletado com sucesso')
      router.replace('/dashboard/customer')
      router.refresh()
    }catch{
      Notification('error', 'Erro ao deletar cliente')
    }
  }

  return (
    <div className='w-[280px] duration-300 hover:scale-110 flex flex-col gap-1 rounded-md p-2 border'>
        <p><strong>Nome: </strong>{name}</p>
        <p><strong>Email: </strong>{email}</p>
        <p><strong>Telefone: </strong>{phone}</p>
        <button onClick={handleDeleteCustomer} className='px-3 w-[90px] rounded text-white bg-red-500'>Deletar</button>
    </div>
  )
}

export default CardCostumer
