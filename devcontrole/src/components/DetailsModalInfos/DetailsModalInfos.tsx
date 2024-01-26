'use client'
import React from 'react'
import { IoNewspaperOutline } from 'react-icons/io5';

interface TicketProps{
    id: string
    name: string
    description: string
    status: string
    created_at: Date | null
    updated_at: Date | null
    customerId: string | null
    userId: string | null
    customer: CustomerProps | null
}

interface CustomerProps{
  id: string,
  name: string,
  phone: string,
  email: string,
  address: string | null
  created_at: Date | null
  updated_at: Date | null
  userId: string | null
}

const DetailsModalInfos = ({ticket} : {ticket: TicketProps | null}) => {

  return (
    <div>
      {/* <ShowModal1/> */}
      <button onClick={() => (document.getElementById(`my_modal_${ticket?.id}`) as HTMLDialogElement)?.showModal()}><IoNewspaperOutline className='text-blue-500 hover:scale-125 duration-500' size={20}/></button>
        <dialog id={`my_modal_${ticket?.id}`} className="modal w-[500px] p-5 rounded-2xl">
          <div className="bg-white modal-box flex flex-col items-start">
              <h3 className="font-bold text-xl">Detalhe do chamado</h3>
              <p><strong>Nome: </strong>{ticket?.name}</p>
              <p className='font-bold'>Descrição:</p>
              <p className='text-start border-b-2 pb-2 w-full'>{ticket?.description}</p>
              <h3 className="font-bold text-lg mt-3">Detalhe do cliente</h3>
              <div className='flex flex-col gap-1'>
                <p className='text-start mt-2'><strong>Nome: </strong>{ticket?.customer?.name}</p>
                <p className='text-start'><strong>Telefone: </strong>{ticket?.customer?.phone}</p>
                <p className='text-start'><strong>Email: </strong>{ticket?.customer?.email}</p>
              </div>
              <div className="modal-action flex justify-end w-full">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn text-end bg-red-500 rounded-md text-white font-bold py-1 px-3">Fechar</button>
                </form>
              </div>
          </div>
        </dialog>
    </div>
  )
}

export default DetailsModalInfos
