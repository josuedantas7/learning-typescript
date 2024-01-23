'use client'
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi'
import Image from 'next/image'

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
            <div className='flex items-center gap-3'>
              <Link href={'/dashboard'}>
              <Image
              width={30}
              height={30}
                className='rounded-full w-[30px] h-[30px]'
                alt='Imagem user'
                src={session.user.image ?? ''}
              />
              </Link>
              <button onClick={handleLogout}><FiLogOut size={25}/></button>
          </div>
          )
        }
    </header>
  )
}

export default Header
