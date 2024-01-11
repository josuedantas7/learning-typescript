// CardProductProps === Product

export interface Product { 
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string
    // product?: Product;
}

export interface CartContextProps {
    products: Product[];
    addCart: (product: Product) => void;
    cart: Product[];
}

export interface CardProductProps {
    product: Product;
    addCart: (product: Product) => void;
}
