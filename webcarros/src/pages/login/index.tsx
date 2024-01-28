import logo from '../../assets/logo.svg'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { useNavigate } from 'react-router-dom';
import Toastfy from '../../components/Toast';
import { AuthContext } from '../../contexts/AuthContext';

interface ToastfyProps {
  success?: boolean;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
  message: string;
}

interface UserProps {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [toastData, setToastData] = useState<ToastfyProps>({
    success: false,
    error: false,
    info: false,
    warning: false,
    message: '',
  });

  const navigate = useNavigate();

  const { handleInfoUser } = useContext(AuthContext)

  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const data: UserProps = {
      email,
      password,
    };

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        setToastData({ success: true, message: 'Usuário logado com sucesso!' });
        handleInfoUser({
          email: user.user?.email,
          uid: user.user?.uid,
          name: user.user?.displayName,
        })
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        },2000)
        console.log(user);
      })
      .catch((err) => {
        setToastData({ error: true, message: 'Erro ao fazer login. Verifique suas credenciais.' });
        console.log(err);
      });
  }

  useEffect(() => {
    async function handleLogout(): Promise<void> {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  return (
    <div className='h-[92vh] w-full flex flex-col items-center justify-center mx-auto'>
      <div className='w-1/2 max-[1000px]:w-[80%] max-[590px]:w-[90%] max-[520px]:w-[100%]'>
        <img src={logo} className='w-[300px] mx-auto h-[100px] mb-8' />
        <div className='flex flex-col bg-white gap-4 p-4 rounded-lg'>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 rounded-md px-4 py-2'
            placeholder='Digite o email...'
            type='email'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 rounded-md px-4 py-2'
            placeholder='Digite a senha...'
            type='password'
          />
          <button onClick={(e) => onSubmit(e)} className='bg-black text-white font-bold py-2 rounded-md hover:bg-gray-800'>
            Acessar
          </button>
        </div>
        <div className='flex justify-center gap-2'>
          <span>Ainda não possui uma conta?</span>
          <span className='underline text-blue-900'>
            <Link to={'/cadastro'}>Cadastre-se</Link>
          </span>
        </div>
      </div>
      <Toastfy {...toastData} />
    </div>
  );
};

export default Login;
