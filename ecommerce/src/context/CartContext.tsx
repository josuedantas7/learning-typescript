import { ReactNode, createContext, useEffect, useState } from "react";

import { getAllProducts } from '../Utils/productsFunctions'

import { Product } from '../types/interfaces'
interface CartContextProps {
    products?: Product[];
    cart?: Product[];
    addCart?: (product: Product) => void;
    removeCart?: (product: Product) => void;
    setCart?: (product: Product[]) => void;
    totalProducts?: number;
}

export const CartContext = createContext<CartContextProps>({ products: [], cart: [] });

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products,setProducts] = useState<Product[]>([])
    const [cart,setCart] = useState<Product[]>([]) 

    async function getProducts(){
        const response =  await getAllProducts()
        console.log(response)
        return setProducts(response as unknown as Product[]);
    }

    function addCart(product : Product ): void {
        const productExists = cart.find((item) => item.id === product.id);
        if (productExists) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...product, qtd: (item.qtd ?? 0) + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qtd: 1 }]);
        }
    }

    function removeCart(product : Product ): void {
        const productExists = cart.find((item) => item.id === product.id);
        if (productExists) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...product, qtd: (item.qtd ?? 0) - 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qtd: 1 }]);
        }
    }

    useEffect(() => {
        getProducts()
    },[])


    return (
        <CartContext.Provider value={{setCart,cart, products, addCart, removeCart}}>
            {children}
        </CartContext.Provider> 
    )
}

