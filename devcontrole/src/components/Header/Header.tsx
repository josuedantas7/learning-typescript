'use client'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi'

const Header = () => {

  const { data: session, status } = useSession()


  console.log(status)

  async function handleLogin(){
    await signIn()
  }

  async function handleLogout(){
    await signOut()
  }

  return (
    <header className='flex justify-between items-center px-2 py-4 bg-white h-20'>
        <Link className='text-2xl font-bold pl-1 duration-300 hover:tracking-widest uppercase' href={'/'}>
            <span className='text-blue-500'>Dev </span>
            <span>Controle</span>
        </Link>
        {status === 'loading' && (
          <button>
            <FiLoader className='animate-spin' size={25} color='#4b5563'/>
          </button>
        )}
        {
          status === 'unauthenticated' && (
            <button onClick={handleLogin}>
              <FiLock size={25} color='#4b5563'/>
            </button>
          )
        }
        {
          status === 'authenticated' && (
            <div className='flex items-center'>
              <Link href={'/dashboard'}><FiUser size={25}/></Link>
              <button onClick={handleLogout}><FiLogOut size={25}/></button>
          </div>
          )
        }
    </header>
  )
}

export default Header
