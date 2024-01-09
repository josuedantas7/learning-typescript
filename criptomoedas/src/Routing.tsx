import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './App'
import Moeda from './pages/Moeda'
import NotFound from './pages/NotFound'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='moeda/:id' element={<Moeda/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </Router>
  )
}

export default Routing
