import { ReactNode } from 'react'

const Container = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-4/5 mx-auto'>
        {children}
    </div>
  )
}

export default Container
