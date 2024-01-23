'use client'
import React from 'react'
import { IoNewspaperOutline } from "react-icons/io5";

const ModalDetail = () => {
  return (
    <div>
    <button onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}><IoNewspaperOutline className='text-blue-500' size={20}/></button>
        <dialog id="my_modal_1" className="modal">
        <div className="bg-white border-2 modal-box flex flex-col items-start">
            <h3 className="font-bold text-xl">Detalhe do chamado</h3>
            <p><strong>Nome: </strong>Problema no computador</p>
            <p className='font-bold'>Descrição:</p>
            <p className='text-start border-b-2 pb-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus laboriosam ut, iure adipisci consequuntur maxime perferendis illo ullam modi accusamus nemo ex odio sit quod alias tenetur mollitia, nam illum.</p>
            <h3 className="font-bold text-lg mt-3">Detalhe do cliente</h3>
            <div className='flex flex-col gap-1'>
              <p className='text-start mt-2'><strong>Nome: </strong>Mercado silva</p>
              <p className='text-start'><strong>Telefone: </strong>94984231330</p>
              <p className='text-start'><strong>Email: </strong>teste@teste.com</p>
            </div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Fechar</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default ModalDetail
