import { ReactNode } from "react"

  
const Container = ({ children } : { children : ReactNode}) => {
  return (
    <div className='bg-gray-100 h-full relative px-20'>
        {children}
    </div>
  )
}

export default Container
