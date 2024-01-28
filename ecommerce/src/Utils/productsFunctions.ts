import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../services/firebaseConnnection";

interface Products {
    id: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    qtd: number;
}

async function getAllProducts(): Promise<Products[]> {
    const productsData: Products[] = [];

    const querySnapshot = await getDocs(collection(db, 'products'));

    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        const product: Products = {
            id: doc.id,
            title: data.title,
            description: data.description,
            cover: data.cover,
            price: data.price,
            qtd: data.qtd,
        };
        productsData.push(product);
    });

    return productsData;
}

export { getAllProducts };
