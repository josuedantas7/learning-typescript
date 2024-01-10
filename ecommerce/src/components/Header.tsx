import { useContext, useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';


const Header = () => {

    const { cart } = useContext(CartContext)
    const [qtd, setQtd] = useState(cart.length)

    useEffect(() => {
        setQtd(cart.length)
    },[cart])

  return (
    <div className='w-full py-2 bg-gray-300'>
        <div className='w-4/5 flex justify-between mx-auto'>
            <Link to={'/'} className='hover:scale-110 duration-500 text-3xl font-bold'>Dev Shop</Link>
            <div className='relative cursor-pointer hover:scale-110 duration-300 py-1 pr-2'>
                <IoCartOutline className='text-[40px] duration-500' />
                <p className='absolute z-20 bg-blue-300 rounded-full px-2 top-0 right-0'>{qtd !== 0 && qtd}</p>
            </div>
        </div>
    </div>
  )
}

export default Header