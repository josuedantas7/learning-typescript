import BotaoVoltar from '@/components/BotaoVoltar/BotaoVoltar'
import React from 'react'
import NewCustomerForm from '@/components/NewCustomerForm/NewCustomerForm'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const NewCustomer =  async () => {

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/login')
  }

  return (
      <div className='px-6'>
        <div className='flex gap-2'>
          <BotaoVoltar/>
          <h1 className='text-3xl font-bold'>Novo cliente</h1>
        </div>
        <NewCustomerForm userId={session.user.id} />
      </div>
  )
}

export default NewCustomer
