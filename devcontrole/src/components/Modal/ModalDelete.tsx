'use client'
import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";


const ModalDelete = () => {
  return (
    <div>
    <button onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}><RiDeleteBin5Line className='text-red-500' size={20}/></button>
        <dialog id="my_modal_2" className="modal">
        <div className="bg-white border-2 modal-box flex flex-col items-start">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
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

export default ModalDelete
