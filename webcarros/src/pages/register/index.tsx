import { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import Toastfy from '../../components/Toast'


interface ToastfyProps{
  success?: boolean;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
  message: string;
}
interface UserProps{
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [toastData, setToastData] = useState<ToastfyProps>({
    success: false,
    error: false,
    info: false,
    warning: false,
    message: '',
  });

  const navigate = useNavigate()


  async function onSubmit(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    const data : UserProps = {
      name,
      email,
      password
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then( async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      setToastData({ success: true, message: 'Usuário cadastrado com sucesso!' });
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      },2000)
    }).catch((err) => {
      console.log(err)
      setToastData({ error: true, message: 'Algo deu errado, tente novamente!' });
    })
  }

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
    handleLogout()
  },[])

  return (
    <div className='h-[92vh] w-full flex flex-col items-center justify-center mx-auto'>
      <div className='w-1/2 max-[1000px]:w-[80%] max-[590px]:w-[90%] max-[520px]:w-[100%]'>
        <img src={logo} className='w-[300px] mx-auto h-[100px] mb-8'/>
        <div className='flex flex-col bg-white gap-4 p-4 rounded-lg'>
          <input onChange={(e) => setName(e.target.value)} className='border-2 rounded-md px-4 py-2' placeholder='Digite seu nome completo...' type="text" />
          <input onChange={(e) => setEmail(e.target.value)} className='border-2 rounded-md px-4 py-2' placeholder='Digite o email...' type="email" />
          <input onChange={(e) => setPassword(e.target.value)} className='border-2 rounded-md px-4 py-2' placeholder='Digite a senha...' type="password" />
          <button onClick={(e) => onSubmit(e)} className='bg-black text-white font-bold py-2 rounded-md hover:bg-gray-800'>Cadastrar</button>
        </div>
        <div className='flex justify-center gap-2'>
          <span>Já possui uma conta?</span>
          <span className='underline text-blue-900'><Link to={"/login"}>Faça login</Link></span>
        </div>
      </div>
      <Toastfy {...toastData} />
  </div>
  )
}

export default Register
