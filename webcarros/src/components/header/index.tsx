import { useContext, useEffect, useState } from 'react'

import logo from '../../assets/logo.svg'

import { RxPerson } from "react-icons/rx";
import { MdLogout } from "react-icons/md";

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

const Header = () => {

  const { signed } = useContext(AuthContext)

  const [authenticated,setAuthenticated] = useState<boolean>(false)

  async function handleLogout(): Promise<void>{
    await signOut(auth)
    setAuthenticated(false)
  }

  useEffect(() => {
    if (signed) {
      setAuthenticated(true)
    }
  },[signed])

  return (
    <div className='px-4 py-3 border-b-[1px] border-black flex justify-between'>
        <Link to='/'>
          <img src={logo} />
        </Link>
        {authenticated ? <MdLogout onClick={handleLogout}  className='text-3xl border-[1px] border-black rounded-full w-[40px] h-[40px] p-2'/> : <RxPerson className='text-3xl border-[1px] border-black rounded-full w-[40px] h-[40px] p-2' />}
    </div>
  )
}

export default Header
