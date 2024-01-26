import BotaoVoltar from '@/components/BotaoVoltar/BotaoVoltar'
import React from 'react'
import NewTicketForm from '@/components/NewTicketForm/NewTicketForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import prismaClient from '@/lib/prisma'

const NewTicket = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user){
    redirect('/')
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }

  })

  const newCustomers = customers.map((customer) => {
    return {
      id: customer.id,
      name: customer.name,
    }
  })

  return (
    <div className='px-6'>
      <div className='flex gap-2'>
          <BotaoVoltar/>
          <h1 className='text-3xl font-bold'>Novo chamado</h1>
      </div>
      <div className='w-full flex flex-col gap-4 mt-8'>
        <NewTicketForm clientes={newCustomers}/>
      </div>
    </div> 
  )
}

export default NewTicket
