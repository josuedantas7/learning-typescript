import React from 'react'
import { InputWithLabel } from '../Input/InputWithLabel'
import SelectComponent from '../SelectComponent/SelectComponent'
import { Button } from '../ui/button'
import Notification from '../Notifier/Notification'
import prismaClient from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

import Link from 'next/link'
  interface NewTicketForm {
    clientes: ClientesProps[]
  }

  interface ClientesProps{
    id: string
    name: string
  }

const NewTicketForm = async ({clientes} : NewTicketForm) => {

    const session = await getServerSession(authOptions)

    async function handleRegisterTicket( formData: FormData){
      "use server"

      const name = formData.get('name')
      const description = formData.get('description')
      const client = formData.get('client')

      if(!name || !description || !client){
        Notification('error', 'Preencha todos os campos')
        return
      }

      await prismaClient.ticket.create({
        data: {
          name: name as string,
          description: description as string,
          customerId: client as string,
          status: 'Aberto',
          userId: session?.user.id as string
        }
      })
      redirect('/dashboard')
    }

  return (
    <form className='flex flex-col gap-3' action={handleRegisterTicket}>
        <InputWithLabel field='name' label='Nome do chamado' />
        <InputWithLabel textarea={true} field='description' label='Descreva o problema' />
        {clientes.length === 0 ? (
          <Link className='font-serif' href={'/new-customer'}>Você ainda não tem nenhum cliente, <span className='underline text-blue-500 font-medium'>Cadastrar cliente</span></Link>
        ) : (
          <SelectComponent name='client' field='Clientes' clients={clientes}/>
        )}
        <Button disabled={clientes.length === 0} type='submit' className={`w-full mt-4 disabled:cursor-not-allowed`}>Criar chamado</Button>
    </form>
  )
}

export default NewTicketForm
