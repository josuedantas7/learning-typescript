import React from 'react'

import logo from '../../assets/logo.svg'
import { RxPerson } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='px-4 py-3 border-b-[1px] border-black flex justify-between'>
        <Link to='/'>
          <img src={logo} />
        </Link>
        <RxPerson  className='text-3xl border-[1px] border-black rounded-full w-[40px] h-[40px] p-2'/>
    </div>
  )
}

export default Header
