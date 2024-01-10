import { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CardProductProps {
    id: number;
    title: string;
    price: number;
    cover: string;
    description: string;
}

interface CardProductProps {
    product: CardProductProps;
}

const CardProduct = ({ product }: CardProductProps) => {

    const { addCart } = useContext(CartContext)

    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
    }

  return (
    <Link to={`produto/${product.id}`} className='w-[250px] h-[350px] relative hover:scale-105 duration-300'>
        <img className='w-[200px] hover:scale-110 duration-300 h-[250px]' src={product.cover}/>
        <div className='flex flex-col gap-2'>
            <h1 className='mt-2'>
                {product.title}
            </h1>
            <div className='flex items-center absolute bottom-0 gap-2'>
                <p>{formatNumber(product.price)}</p>
                <button onClick={() => addCart(product)}><IoCartOutline className='rounded-md bg-black text-white p-1 text-[25px]' /></button>
            </div>
        </div>
    </Link>
  )
}

export default CardProduct
