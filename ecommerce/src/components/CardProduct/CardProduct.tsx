import { useContext, useEffect } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

import { Product } from '../../types/interfaces'


const CardProduct = ({ product }: { product: Product }) => {
    const { addCart } = useContext(CartContext);
  
    function formatNumber(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }

    function addCartFunction(){
        if (addCart) {
            addCart(product);
        }
    }
  
    useEffect(() => {
      console.log(product);
    }, [product]);
  
    return (
      <div className='w-[250px] h-[350px] relative hover:scale-105 duration-300'>
        <img className='w-[200px] hover:scale-110 duration-300 h-[250px]' src={product.cover} alt={product.title} />
        <div className='flex flex-col gap-2'>
          <Link to={`produto/${product.id}`} className='mt-2'>
            {product.title}
          </Link>
          <div className='flex items-center absolute bottom-0 gap-2'>
            <p>{formatNumber(product.price)}</p>
            <button onClick={() => addCartFunction()}>
              <IoCartOutline className='rounded-md bg-black text-white p-1 text-[25px]' />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardProduct;
  