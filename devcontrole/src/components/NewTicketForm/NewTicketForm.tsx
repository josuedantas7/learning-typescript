'use client'
import React, { useState } from 'react'
import { InputWithLabel } from '../Input/InputWithLabel'
import SelectComponent from '../SelectComponent/SelectComponent'
import { Button } from '../ui/button'
import Notification from '../Notifier/Notification'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

type CreateTicketFormData = z.infer<typeof createTicketFormSchema>

interface NewTicketFormProps {
    name: string
    description: string
    client?: string;
}

const createTicketFormSchema = z.object({
    name: z.string()
    .min(1, 'Nome precisa ser preenchido')
    .transform(name => {
      return name.trim().split(' ').map(word => word[0].toUpperCase().concat(word.slice(1))).join(' ')
    }),
    description: z.string().min(1, 'Descrição precisa ser preenchida'),
  })

const NewTicketForm = () => {

    const [client, setClient] = useState<string>('')

    const [output,setOutput] = useState<string | null>()
  
    const { 
        register, 
        handleSubmit, 
        formState: { errors } } = useForm<CreateTicketFormData>({
        resolver: zodResolver(createTicketFormSchema)
      })
  
    const clientes = [
      'Josue',
      'Josue2',
      'Josue3',
      'Josue4',
    ]

    function onSubmit( data : NewTicketFormProps){
        
        if (!client || !data.name || !data.description) {
            Notification('error', 'Preencha todos os campos')
            return
        }

        const newData : NewTicketFormProps = {
            name: data.name,
            description: data.description,
            client: client
        }

        setOutput(JSON.stringify(newData))
        console.log(newData)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel register={register} field='name' label='Nome do chamado' />
        {errors.name && <p>{errors.name.message}</p>}
        <InputWithLabel textarea={true} register={register} field='description' label='Descreva o problema' />
        {errors.description && <p>{errors.description.message}</p>}
        <SelectComponent onChange={setClient} field='Selecione seu cliente' clients={clientes} />
        <Button type='submit' className="w-full mt-4">Criar chamado</Button>
        <p>{output}</p>
    </form>
  )
}

export default NewTicketForm
