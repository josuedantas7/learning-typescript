import { ReactNode, createContext, useEffect, useState } from "react";

import { getAllProducts } from '../Utils/productsFunctions'

import { Product } from '../types/interfaces'
interface CartContextProps {
    products?: Product[];
    cart?: Product[];
    addCart?: (product: Product) => void;
    removeCart?: (product: Product) => void;
    setCart?: (product: Product[]) => void;
    setQtdTotal?: (qtd: number) => void;
    qtdTotal?: number;
}

export const CartContext = createContext<CartContextProps>({ products: [], cart: [] });

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products,setProducts] = useState<Product[]>([])
    const [cart,setCart] = useState<Product[]>([])
    const [qtdTotal, setQtdTotal] = useState<number>(0)

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
        if (cart){
            let qtd = 0
            cart.forEach((product) => {
                qtd += product.qtd ?? 0
            })
            setQtdTotal && setQtdTotal(qtd)
        } 
    },[cart, setQtdTotal])

    useEffect(() => {
        getProducts()
    },[])


    return (
        <CartContext.Provider value={{setCart,cart, products, addCart, removeCart, setQtdTotal, qtdTotal}}>
            {children}
        </CartContext.Provider> 
    )
}

