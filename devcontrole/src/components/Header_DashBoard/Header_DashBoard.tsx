import Link from 'next/link'
import React from 'react'

const Header_DashBoard = () => {
  return (
    <div className='px-6'>
        <div className='w-full mb-8 mx-auto flex items-center gap-2 py-2 px-4 rounded-lg text-white bg-purple-900'>
            <Link className='duration-300 hover:font-semibold hover:scale-110' href={'/dashboard'}>Chamados</Link>
            <Link className='duration-300 hover:font-semibold hover:scale-110' href={'/dashboard/customer'}>Clientes</Link>
        </div>
    </div>
  )
}

export default Header_DashBoard
