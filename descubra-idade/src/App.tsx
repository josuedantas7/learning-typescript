import { useEffect, useState } from 'react'

function App() {

  const [name,setName] = useState<string>('')
  const [year,setYear] = useState<number>(0)
  const [idade,setIdade] = useState<number>(0)

  const [pessoa, setPessoa] = useState<{ nome: string | null, idade: number | null }>({
    nome: null,
    idade: null
  });

  function onSubmit(){

    setYear(year)
    setName(name)

    setIdade(new Date().getFullYear() - year)

    setPessoa({
      nome:name,
      idade:idade
    })

    setTimeout(() => {
      clearLabels()
    }, 1000)
  }

  function clearLabels(){
    setName('')
    setYear(0)
    setIdade(0)
  }

  return (
    <div className='flex flex-col items-center pt-20 bg-black w-full h-screen'>
      <h1 className='text-center text-white font-bold mb-6 text-3xl'>Descubra sua idade</h1>
      <div className='flex flex-col items-center bg-white rounded-2xl p-12'>
      <form className='flex flex-col gap-1' onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className='w-[400px] flex flex-col mx-auto gap-2'>
            <label htmlFor="">Digite seu nome?</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome' className='border-2 rounded-lg px-2 py-1' type="text" />
          </div>
          <div className='w-[400px] flex flex-col mx-auto gap-2'>
            <label htmlFor="">Digite o ano que nasceu?</label>
            <input value={year} onChange={(e) => setYear(parseInt(e.target.value))} placeholder='Ano de nascimento' className='border-2 rounded-lg px-2 py-1' type="number" />
          </div>
          <button className='bg-blue-200 w-full mt-3 py-2 rounded-lg hover:bg-green-300 hover:text-white font-bold mx-auto' onClick={onSubmit}>Calcular idade</button>
        </form>
      </div>
      {pessoa.nome && <h2 className=' text-white text-2xl font-bold mt-8'>{pessoa.nome} você tem: {pessoa.idade}</h2>}
    </div>
  )
}

export default App
