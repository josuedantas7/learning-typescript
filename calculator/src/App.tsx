import { useState } from "react"
import logo from './assets/logo.png'

export default function App() {


  const [gasolina,setGasolina] = useState<number>(0)
  const [alcool,setAlcool] = useState<number>(0)

  function calcular() {
    const resultado = alcool / gasolina
    if(resultado > 0.7) {
      return alert("Melhor usar Gasolina")
    } else {
      return alert("Melhor usar Alcool")
    }
  }

  return (
    <div className="w-full h-screen bg-blue-300 pt-20">
      <img className="mx-auto" src={logo}/>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col mx-auto w-[500px]">
          <label htmlFor="">
            Alcool
          </label>
          <input className="border-2 py-2 rounded-lg" onChange={(e) => setAlcool(parseFloat(e.target.value))} type="number" placeholder="Alcool" />
        </div>
        <div className="flex flex-col mx-auto w-[500px]">
          <label htmlFor="">
            Gasolina
          </label>
          <input className="border-2 py-2  rounded-lg" onChange={(e) => setGasolina(parseFloat(e.target.value))} type="number" placeholder="Gasolina" />
        </div>
        <button onClick={calcular} className="bg-green-500 hover:bg-green-200 mx-auto w-[500px] rounded-lg py-2">Calcular</button>
        </div>
    </div>
  )
}

