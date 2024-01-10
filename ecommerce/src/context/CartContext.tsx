import { ReactNode, createContext, useEffect, useState } from "react";

import { getAllProducts } from '../Utils/productsFunctions'

interface Product{
    id : number,
    title : string,
    price : number,
    cover: string,
    description : string,
}

interface CartContextProps {
    products: Product[];
    addCart: (product: Product) => void;
    cart: Product[];
}

export const CartContext = createContext<CartContextProps>({ products: [], addCart: () => {}, cart: [] });

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products,setProducts] = useState<[]>([])
    const [cart,setCart] = useState<Product[]>([]) 

    async function getProducts(){
        const response =  await getAllProducts()
        console.log(response)
        setProducts(response)
    }

    function addCart(product : Product ){
        setCart([...cart,product])
    }

    useEffect(() => {
        getProducts()
    },[])


    return (
        <CartContext.Provider value={{cart,products, addCart}}>
            {children}
        </CartContext.Provider> 
    )
}

