import React from 'react'
import DetailsModalInfos from '../DetailsModalInfos/DetailsModalInfos';
interface TicketProps{
  id: string
  name: string
  description: string
  status: string
  created_at: Date | null
  updated_at: Date | null
  customerId: string | null
  userId: string | null
  customer: CustomerProps | null
}

interface CustomerProps{
  id: string,
  name: string,
  phone: string,
  email: string,
  address: string | null
  created_at: Date | null
  updated_at: Date | null
  userId: string | null
}

const ModalDetail = async ({ticket} : { ticket : TicketProps | null}) => {

  return (
    <div>
      <DetailsModalInfos ticket={ticket}/>
    </div>
  )
}

export default ModalDetail
