import { db } from "../../services/firebaseConnection";

import { GrFireball } from "react-icons/gr";

import { RiDeleteBinLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";

type CardCarProps = {
  owner?: boolean;
  year: string;
  km: string;
  price: string | number;
  city: string;
  name: string;
  fotoCarro: string;
  id: string;
  created?: Date;
}

const CardCar = ({owner = false,name,year,km,price,city,fotoCarro,id } : CardCarProps ) => {

  async function handleDeleteCar(id: string){
    const docRef = doc(db, "cars", id)
    await deleteDoc(docRef);
  }



  return (
    <div className='flex flex-col w-[350px] relative gap-2 bg-white rounded-lg'>
        <img src={fotoCarro} className='rounded-lg'/>
        <div className='px-2 flex border-b flex-col gap-1.5'>
            <p className='font-semibold'>{name}</p>
            <div className='flex gap-2 items-center text-sm'>
                <p>{year}</p>
                <GrFireball className='text-sm'/>
                <p>{km}km</p>
            </div>
            <h3 className='font-bold text-lg mt-3 pb-2'>
              R$ {price}
            </h3>
        </div>
        <p className='px-2 pb-2'>{city}</p>
        {owner && <RiDeleteBinLine onClick={() => handleDeleteCar(id)} className='cursor-pointer bg-white w-[40px] h-[40px] rounded-full p-2 absolute top-2 right-2 text-2xl'/>}
    </div>
  )
}

export default CardCar
