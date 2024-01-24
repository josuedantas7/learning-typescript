'use client'
import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Notification from '../Notifier/Notification'

const ContainerLogged = ({children} : {children : ReactNode}) => {
    const { data: session, status } = useSession()

    const router = useRouter()
  
    useEffect(() => {
        if (status === 'unauthenticated') {
          Notification('error', 'Você não está autenticado!')
          router.push('/');
        }
      }, [status, router]);

  return (
    <div>
        {children}
    </div>
  )
}

export default ContainerLogged
