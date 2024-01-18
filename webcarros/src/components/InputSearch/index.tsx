import { ChangeEvent, SetStateAction } from "react";

interface InputSearchProps {
    input: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
    handleSearchCar: () => void;
}
  
const InputSearch = ({input,setSearch, handleSearchCar} : InputSearchProps) => {
    
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

  return (
    <div className='flex justify-between gap-5 rounded-xl w-[90%] mx-auto bg-white p-4'>
        <div className='border-2 relative w-4/5 rounded-md'>
            <input value={input} onChange={handleChange} placeholder='Digite o nome do carro...' type="text" className='w-full rounded-md h-full py-2 px-5' />
        </div>
        <button onClick={() => handleSearchCar()} className='w-1/5 bg-red-500 text-white font-bold rounded-md'>Buscar</button>
    </div>
  )
}

export default InputSearch
