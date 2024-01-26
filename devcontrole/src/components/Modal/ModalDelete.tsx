'use client'
import React from 'react'
import ShowModal from '../ShowModal/ShowModal1';
import { useRouter } from 'next/navigation';
import Notification from '../Notifier/Notification';
import { api } from '@/lib/api'

const ModalDelete = ({id} : { id: string }) => {

  const router = useRouter()

  const deleteTicket = async (id: string) => {
    try{
      await api.delete(`/api/ticket`, {
        params: {
          id: id
        }
      })
      Notification('success', 'Chamado deletado com sucesso!')
      router.replace('/dashboard')
      router.refresh()
    }catch{
      console.log('Erro ao deletar chamado')
    }
  }

  return (
    <div>
      <ShowModal id={id} />
      <dialog id={`my_modal_${id+1}`} className="modal w-[500px] p-5 rounded-2xl">
        <div className="bg-white modal-box flex flex-col items-start">
            <h3 className="font-bold text-lg">Deseja excluir esse Chamado?</h3>
            <div className="modal-action w-full">
            <form className='flex justify-center gap-20 mt-8' method="dialog">
                <button onClick={() => deleteTicket(id)} className="btn py-1 px-4 bg-red-500 text-white font-bold rounded-lg">Sim</button>
                <button className="btn py-1 px-4 bg-emerald-500 text-white font-bold rounded-lg">Fechar</button>
            </form>
            </div>
        </div>
      </dialog>
    </div>
  )
}

export default ModalDelete
