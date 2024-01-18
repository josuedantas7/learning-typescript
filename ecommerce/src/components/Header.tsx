import { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';


const Header = () => {

    const { qtdTotal } = useContext(CartContext)

  return (
    <div className='w-full py-2 bg-gray-300'>
        <div className='w-4/5 flex justify-between mx-auto'>
            <Link to={'/'} className='hover:scale-110 duration-500 text-3xl font-bold'>Dev Shop</Link>
            <Link to={"/carrinho"} className='relative cursor-pointer hover:scale-110 duration-300 py-1 pr-2'>
                <IoCartOutline className='text-[40px] duration-500' />
                <p className='absolute z-20 bg-blue-300 rounded-full px-2 top-0 right-0'>{qtdTotal}</p>
            </Link>
        </div>
    </div>
  )
}

export default Header
