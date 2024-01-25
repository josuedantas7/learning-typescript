import ContainerLogged from '@/components/ContainerLogged/ContainerLogged'
import React from 'react'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import CardCostumer from '@/components/CardCostumer/CardCostumer'

const Customer = async () => {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/')
    }

  return (
      <div className='px-6'>
          <div className='flex justify-between items-center mb-7'>
            <h1 className='text-3xl font-bold'>Meus clientes</h1>
            <Link className='px-6 py-1 rounded text-white font-bold duration-300 hover:scale-105 bg-blue-300' href={'/new_customer'}>Novo cliente</Link>
          </div>
          <div className='flex flex-wrap gap-3'>
            <CardCostumer/>
            <CardCostumer/>
            <CardCostumer/>
          </div>
      </div>
  )
}

export default Customer
