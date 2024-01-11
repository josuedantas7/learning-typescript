import { useContext, useEffect, useState } from 'react'

import { CartContext } from '../context/CartContext'

import { Product } from '../types/interfaces'

interface NewProductProps extends Product {
    qtd: number;
}

const Carrinho = () => {
    const { cart } = useContext(CartContext);

    const [filteredCart, setFilteredCart] = useState<NewProductProps[]>([]);

    function filterCart() {
        if (cart) {
            const productCountMap: Map<number, number> = new Map();
    
            cart.forEach((product) => {
                const count = productCountMap.get(product.id) || 0;
                productCountMap.set(product.id, count + 1);
            });
    
            const cartWithQuantities: NewProductProps[] = Array.from(productCountMap.keys()).map((id) => {
                const product = cart.find((p) => p.id === id);
    
                return {
                    ...product!,
                    qtd: productCountMap.get(id) || 0,
                };
            });
    
            // Filtrar itens com quantidade zero
            const filteredCart = cartWithQuantities.filter((product) => product.qtd > 0);
    
            setFilteredCart(filteredCart);
        }
    }

    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

    function addProduct(id: number) {
        setFilteredCart((prevCart) =>
            prevCart.map((product) =>
                product.id === id ? { ...product, qtd: product.qtd + 1 } : product
            )
        );
    }

    function removeProduct(id: number) {
        setFilteredCart((prevCart) =>
            prevCart.map((product) =>
                product.id === id ? { ...product, qtd: Math.max(product.qtd - 1, 0) } : product
            )
        );
    }

    useEffect(() => {
        filterCart();
        console.log(filteredCart)
    }, [cart]);

  return (
    <div>
        {filteredCart?.map((product) => (
            product.qtd > 0 && (
                <div className='flex border-b-[1px] items-center justify-between text-gray-600 text-sm' key={product.id}>
                    <div className='w-1/4'>
                        <img className='w-[100px] h-[100px]' src={product.cover} alt={product.title} />
                    </div>
                    <p className='w-1/4 text-center font-bold'>Preço: {formatNumber(product.price)}</p>
                    <p className='w-1/4 flex justify-center gap-1'>
                        <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => removeProduct(product.id)}>
                            -
                        </span> 
                        {product.qtd} 
                        <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => addProduct(product.id)}>
                            +
                        </span>
                    </p>
                    <p className='w-1/4 text-center font-bold'>SubTotal: {formatNumber(product.qtd * product.price)}</p>
                </div>
            )
        ))}
        <p className='font-bold text-sm text-gray-600 mt-2'>Total: {formatNumber(filteredCart.reduce((acc, product) => acc + product.price * product.qtd, 0))}</p>
    </div>
  )
}

export default Carrinho
