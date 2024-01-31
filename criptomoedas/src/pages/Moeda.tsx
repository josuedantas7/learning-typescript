import { useParams } from 'react-router-dom'
import { getOneCoin } from '../Utils/criptoFunctions'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

const Moeda = () => {

    interface CoinProps{
        name: string,
        symbol: string,
        price: string,
        delta_24h: string
        high_24h: string,
        low_24h: string,
        market_cap: string,
    }

    const {id} = useParams()

    const [coin,setCoin] = useState<CoinProps | null>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error,setError] = useState<boolean>(false)


    useEffect(() => {
        async function getCoin(){
            const response = await getOneCoin(id || '')
            if (response === 'Moeda não encontrada') setError(true)
            setCoin(response)
            setLoading(false)
        }
        getCoin()
    },[id])


    function formatNumber(numero: string | number){
        if (numero == 0) return numero
        const newNumero = parseFloat((numero as string).replace(',', '.'))
        return newNumero
    }
    
    function formatNumber2(numero: string | number){
    if (numero == 0) return numero
    const newNumero = parseFloat(numero as string).toFixed(2)
    return newNumero
    }


    if (error) return (
        <div className='w-full bg-slate-900 pt-12 h-screen'>
            <Header />
            <h1 className='text-white text-center mt-8'>Moeda não encontrada</h1>
        </div>
    )
    return (
        <div className={`w-full bg-slate-900 pt-12 h-screen`}>
            <Header />
            {loading ? <h1 className='text-white text-center mt-8'>Carregando moeda...</h1> : coin ? (
                <div className='flex flex-col gap-3'>
                    <h1 className='text-center mt-8 font-bold text-white text-4xl'>
                        {coin.name}
                    </h1>
                    <h2 className='text-center font-bold text-gray-600 text-xl'>
                        {coin.symbol}
                    </h2>
                    <div className='flex flex-col gap-2 w-[500px] rounded-lg bg-gray-800 text-white mx-auto py-4 px-8'>
                        <div className='flex gap-2'>
                            <h3 className='font-bold'>Preço:</h3>
                            <p>R$ {formatNumber2(coin.price)}</p>
                        </div>
                        <div className='flex gap-2'>
                            <h3 className='font-bold'>Maior preço 24h:</h3>
                            <p>R$ {formatNumber2(coin.high_24h)}</p>
                        </div>
                        <div className='flex gap-2'>
                            <h3 className='font-bold'>Menor preço 24h:</h3>
                            <p>R$ {formatNumber2(coin.low_24h)}</p>
                        </div>
                        <div className='flex gap-2'>
                            <h3 className='font-bold'>Variação 24h:</h3>
                            {formatNumber(coin.delta_24h) > 0 ? <p className='text-center font-bold text-green-700'>{coin.delta_24h}</p> : <p className='text-center text-red-900 font-bold'>{coin.delta_24h}</p>}
                        </div>
                        <div className='flex gap-2'>
                            <h3 className='font-bold'>Valor de mercado:</h3>
                            <p>R$ {formatNumber2(coin.market_cap)}</p>
                        </div>
                    </div>
                </div>
            ): (
                <h1>Moeda não encontrada</h1>
            )}
        </div>
    )
}

export default Moeda
