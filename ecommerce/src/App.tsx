import { useContext, useEffect } from 'react'
import { CartContext } from './context/CartContext'
import CardProduct from './components/CardProduct/CardProduct'

function App() {

  const { products } = useContext(CartContext)


  useEffect(() => {
    console.log(products)
  },[products])

  return (
    <>
      <h1 className='text-center text-2xl font-bold my-4'>Produtos em alta</h1>
      <div className='flex flex-wrap gap-6 justify-between'>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default App
