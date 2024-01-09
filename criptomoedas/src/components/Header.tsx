import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <Link to={'/'}>
        <img className='mx-auto' src={logo}/>
    </Link>
  )
}

export default Header
