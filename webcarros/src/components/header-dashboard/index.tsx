import { Link } from 'react-router-dom'

function Header_Dashboard() {
  return (
    <div className='flex bg-red-500 text-white py-1 rounded-lg px-6 font-semibold gap-5 items-start'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/dashboard/new'>Novo carro</Link>
    </div>
  )
}

export default Header_Dashboard
