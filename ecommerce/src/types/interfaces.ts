// CardProductProps === Product

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category?: string;
    cover: string;
  }

export interface CartContextProps {
    products?: Product[];
    addCart?: (product: Product) => void;
    cart?: Product[];
}

export interface CardProductProps {
    product?: Product;
    addCart?: (product: Product) => void;
}
