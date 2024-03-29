import axios from 'axios'

async function getAllCoins(){
    const response = await axios.get(`https://sujeitoprogramador.com/api-cripto/?key=f0ac930563f47e3c&pref=BRL`)
    return response.data
}

async function getOneCoin(symbol: string){
    try{
        const response = await axios.get(`https://sujeitoprogramador.com/api-cripto/coin/?key=f0ac930563f47e3c&symbol=${symbol}&pref=BRL`)
        return response.data
    } catch(error){
        return 'Moeda não encontrada'
    }
}

export { getAllCoins, getOneCoin }