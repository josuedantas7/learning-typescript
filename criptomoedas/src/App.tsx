import { useEffect, useState } from 'react'
import InputSearch from './components/Input/InputSearch'

import { getAllCoins } from './Utils/criptoFunctions'
import Header from './components/Header'
import { Link } from 'react-router-dom'

function App() {

  interface CoinProps{
    name: string,
    symbol: string,
    market_cap: string,
    price: string,
    delta_24h: string
  }

  const [coins, setCoins] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function getCoins(){
    const response = await getAllCoins()
    setCoins(response.coins)
    setLoading(false)
    console.log(response.coins)
  }

  useEffect(() => {
    getCoins()
  },[])

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

  return (
    <div className={`w-full bg-slate-900 pt-12 ${loading ? 'h-screen' : 'h-full'}`}>
      <Header/>
      <div className='w-4/5 mx-auto mt-12'>
        <InputSearch />
      </div>
      <div className='mt-8'>
        <div className='w-4/5 mx-auto text-white flex uppercase'>
          <p className='text-center w-1/4'>Moeda</p>
          <p className='text-center w-1/4'>Valor mercado</p>
          <p className='text-center w-1/4'>Preço</p>
          <p className='text-center w-1/4'>Volume</p>
        </div> 
        {loading ? <h1 className='text-white text-center mt-8'>Carregando moedas...</h1> : (
          <div className='mx-auto w-4/5'>
            {coins && coins.map((coin: CoinProps) => {
              return(
                <Link to={`/moeda/${coin.symbol}`} className='bg-slate-800  rounded-lg mt-4 py-2 flex mx-auto w-full' key={coin.name}>
                  <p className='text-center w-1/4 text-white'><strong>{coin.name}</strong> | {coin.symbol}</p>
                  <p className='text-center w-1/4 text-gray-400'>R$ {formatNumber2(coin.market_cap)}</p>
                  <p className='text-center w-1/4 text-gray-400'>R$ {formatNumber2(coin.price)}</p>
                  {formatNumber(coin.delta_24h) > 0 ? <p className='text-center w-1/4 font-bold text-green-700'>{coin.delta_24h}</p> : <p className='text-center w-1/4 text-red-900 font-bold'>{coin.delta_24h}</p>}
                </Link>
              )
            })}
          </div>
        )}
        </div>
    </div>
  )
}
export default App
