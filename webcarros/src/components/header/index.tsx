import { useContext } from 'react'

import logo from '../../assets/logo.svg'

import { RxPerson } from "react-icons/rx";
import { MdLogout } from "react-icons/md";

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const Header = () => {

  const { signed } = useContext(AuthContext)

  async function handleLogout(): Promise<void>{
    await signOut(auth)
  }

  return (
    <div className='px-4 py-3 border-b-[1px] border-black flex justify-between'>
        <Link to='/'>
          <img src={logo} />
        </Link>
        <ThemeSwitcher />
        {signed ? <MdLogout onClick={handleLogout}  className='text-3xl border-[1px] border-black rounded-full w-[40px] h-[40px] p-2'/> : (
          <Link to="/login"><RxPerson className='text-3xl border-[1px] border-black rounded-full w-[40px] h-[40px] p-2' /></Link>
        )}
    </div>
  )
}

export default Header
