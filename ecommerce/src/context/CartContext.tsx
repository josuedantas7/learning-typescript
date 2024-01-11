import { ReactNode, createContext, useEffect, useState } from "react";

import { getAllProducts } from '../Utils/productsFunctions'

import { Product } from '../types/interfaces'
interface CartContextProps {
    products?: Product[];
    addCart?: (product: Product) => void;
    cart?: Product[];
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
        return setCart([...cart,product])
    }

    useEffect(() => {
        getProducts()
    },[])


    return (
        <CartContext.Provider value={{cart, products, addCart}}>
            {children}
        </CartContext.Provider> 
    )
}

