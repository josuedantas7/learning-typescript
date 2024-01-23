import Link from 'next/link'
import React from 'react'

import { FiUser, FiLogOut } from 'react-icons/fi'

const Header = () => {
  return (
    <header className='flex justify-between items-center px-2 py-4 bg-white h-20'>
        <Link className='text-2xl font-bold pl-1 duration-300 hover:tracking-widest uppercase' href={'/'}>
            <span className='text-blue-500'>Dev </span>
            <span>Controle</span>
        </Link>
        <div className='flex items-center'>
            <Link href={'/dashboard'}><FiUser size={25}/></Link>
            <Link href={'/logout'}><FiLogOut size={25}/></Link>
        </div>
    </header>
  )
}

export default Header
