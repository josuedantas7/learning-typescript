import React from 'react'

import { useParams } from 'react-router-dom'

const CarDetail = () => {
  const { id } = useParams<{ id: string }>()


  return (
    <div>
        <h1>Carro : {id}</h1>
    </div>
  )
}

export default CarDetail
