import React from 'react'
import { FcSearch } from "react-icons/fc";
import { getOneCoin } from '../../Utils/criptoFunctions.js'
import { useNavigate } from 'react-router-dom';

const InputSearch = () => {
    const navigate = useNavigate()

    const [search, setSearch] = React.useState<string>('')

    const handleSearch = () => {
        navigate(`/moeda/${search}`)
    }
    
  return (
    <div className='flex items-center w-full gap-2'>
        <input placeholder='Digite o simbolo da moeda: BTC...' className='py-2 w-full rounded-lg px-4' onChange={(e) => setSearch(e.target.value)} type='text'/>
        <button onClick={handleSearch}><FcSearch className='text-3xl' /></button>
    </div>
  )
}

export default InputSearch
