'use client'
import BotaoVoltar from '@/components/BotaoVoltar/BotaoVoltar'
import Header_DashBoard from '@/components/Header_DashBoard/Header_DashBoard'
import { InputWithLabel } from '@/components/Input/InputWithLabel'
import React, { useState } from 'react'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import { Button } from "@/components/ui/button"
import Toast from '@/components/Toastfy/Toast'

interface ObjectToastProps{
  type: string;
  message: string;
}


const NewTicket = () => {

  const [nameTicket, setNameTicket] = useState<string>('')
  const [descriptionTicket, setDescriptionTicket] = useState<string>('')
  const [selectedClient, setSelectedClient] = useState<string>('')

  const [toggleToast, setToggleToast] = useState<boolean>(false)
  const [objectToast, setObjectToast] = useState<ObjectToastProps>({
    type: '',
    message: ''
  })


  const clientes = [
    'Josue',
    'Josue2',
    'Josue3',
    'Josue4',
  ]

  function onSubmit(){

    if (nameTicket === '' || descriptionTicket === '' || selectedClient === '') {
      setToggleToast(true)
      setObjectToast({type: 'error', message: 'Preencha todos os campos!'})
      return
    }

    const data = {
      nameTicket,
      descriptionTicket,
      selectedClient
    }
    setToggleToast(true)
    setObjectToast({type: 'success', message: 'Chamado criado com sucesso!'})
  }

  return (
    <div className='px-6'>
        <Header_DashBoard/>
        <div className='flex gap-2'>
          <BotaoVoltar/>
          <h1 className='text-3xl font-bold'>Novo chamado</h1>
        </div>
        <div className='w-full flex flex-col gap-4 mt-8'>
          <InputWithLabel onChange={setNameTicket} label='Nome do chamado' />
          <InputWithLabel textarea={true} onChange={setDescriptionTicket} label='Descreva o problema' />
          <SelectComponent onChange={setSelectedClient} field='Selecione seu cliente' clients={clientes} />
          <Button onClick={() => onSubmit()} className="w-full mt-4">Criar chamado</Button>
        </div>
        {toggleToast && <Toast type={objectToast.type} message={objectToast.message} />}
    </div>
  )
}

export default NewTicket
