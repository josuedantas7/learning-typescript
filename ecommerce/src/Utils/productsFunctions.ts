import axios from 'axios'
const url: string = 'http://localhost:3000/products'
interface Products { 
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string
}

async function getAllProducts() : Promise<Products[]>{
    const response = await axios.get(url)
    return response.data
}


export { getAllProducts }