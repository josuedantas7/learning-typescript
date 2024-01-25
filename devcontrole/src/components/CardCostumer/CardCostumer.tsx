import React from 'react'

const CardCostumer = () => {
  return (
    <div className='w-[280px] flex flex-col gap-1 rounded-md p-2 border'>
        <p><strong>Nome: </strong>Lucas</p>
        <p><strong>Email: </strong>lucas@teste.com</p>
        <p><strong>Telefone: </strong>94984231330</p>
        <button className='px-3 w-[90px] rounded text-white bg-red-500'>Deletar</button>
    </div>
  )
}

export default CardCostumer
