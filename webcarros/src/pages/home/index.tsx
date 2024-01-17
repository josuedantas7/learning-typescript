import { useState, useEffect } from "react"
import CardCar from "../../components/CardCar/"
import InputSearch from "../../components/InputSearch/"
import Title from "../../components/Title/Title"

import { collection, query, getDocs} from 'firebase/firestore'

import { db } from '../../services/firebaseConnection'

interface CarProps{
  owner: string | null | undefined,
  uid: string | undefined | null;
  created: Date;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string;
  city: string;
  whatsapp: string;
  description: string;
  images: ImageProps[];
}

interface ImageProps{
  name: string;
  uid: string;
  url: string;
}

export default function Home(){
  
  const [search,setSearch] = useState<string>('')
  const [cars,setCars] = useState<CarProps[]>([])

  async function getCarros(){
    const q = query(collection(db, "cars"))
    const querySnapshot = await getDocs(q);
    const cars = querySnapshot.docs.map(doc => doc.data() as CarProps)
    setCars(cars)
  }

  useEffect(() => {
    getCarros()
  },[])

  return (
    <div className="pt-12 h-[92vh] bg-gray-100">
      <InputSearch setSearch={setSearch}/>
      <div className="mt-8">
        <Title title="Carros novos e usados em todo o Brasil" center={true} secundary={true} />
        <div className="flex mt-4 flex-wrap justify-between gap-3">
          {cars.map((car) => {
            return (
              <CardCar
                id={"1"}
                key={car.uid}
                name={car.name}
                year={car.year}
                km={car.km}
                price={car.price}
                city={car.city}
                fotoCarro={car.images[0].url}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
