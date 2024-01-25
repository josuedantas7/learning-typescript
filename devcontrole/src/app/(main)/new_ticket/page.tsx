'use client'
import BotaoVoltar from '@/components/BotaoVoltar/BotaoVoltar'
import { InputWithLabel } from '@/components/Input/InputWithLabel'
import React, { useState } from 'react'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import { Button } from "@/components/ui/button"
import Toast from '@/components/Toastfy/Toast'
import ContainerLogged from '@/components/ContainerLogged/ContainerLogged'
import Notification from '@/components/Notifier/Notification'

interface ObjectToastProps{
  type: string;
  message: string;
}


const NewTicket = () => {

  const [nameTicket, setNameTicket] = useState<string>('')
  const [descriptionTicket, setDescriptionTicket] = useState<string>('')
  const [selectedClient, setSelectedClient] = useState<string>('')


  const clientes = [
    'Josue',
    'Josue2',
    'Josue3',
    'Josue4',
  ]

  function onSubmit(){

    if (nameTicket === '' || descriptionTicket === '' || selectedClient === '') {
      Notification('error', 'Preencha todos os campos!')
      return
    }

    const data = {
      nameTicket,
      descriptionTicket,
      selectedClient
    }
    Notification('success', 'Chamado criado com sucesso!')
  }

  return (
    <ContainerLogged>
      <div className='px-6'>
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
      </div>
    </ContainerLogged>
  )
}

export default NewTicket
