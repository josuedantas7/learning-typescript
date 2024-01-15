import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='h-[92vh] w-full flex flex-col items-center justify-center mx-auto'>
      <div className='w-1/2 max-[1000px]:w-[80%] max-[590px]:w-[90%] max-[520px]:w-[100%]'>
        <img src={logo} className='w-[300px] mx-auto h-[100px] mb-8'/>
        <div className='flex flex-col bg-white gap-4 p-4 rounded-lg'>
          <input className='border-2 rounded-md px-4 py-2' placeholder='Digite seu nome completo...' type="text" />
          <input className='border-2 rounded-md px-4 py-2' placeholder='Digite o email...' type="text" />
          <input className='border-2 rounded-md px-4 py-2' placeholder='Digite a senha...' type="text" />
          <button className='bg-black text-white font-bold py-2 rounded-md hover:bg-gray-800'>Cadastrar</button>
        </div>
        <div className='flex justify-center gap-2'>
          <span>Já possui uma conta?</span>
          <span className='underline text-blue-900'><Link to={"/login"}>Faça login</Link></span>
        </div>
      </div>
  </div>
  )
}

export default Register
