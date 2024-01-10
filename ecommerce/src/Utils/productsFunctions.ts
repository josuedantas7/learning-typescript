import axios from 'axios'
const url = 'http://localhost:3000/products'

async function getAllProducts(){
    const response = await axios.get(url)
    return response.data
}


export { getAllProducts }