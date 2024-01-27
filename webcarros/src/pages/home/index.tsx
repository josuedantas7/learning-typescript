import { useState, useEffect } from "react"
import CardCar from "../../components/CardCar/"
import InputSearch from "../../components/InputSearch/"
import Title from "../../components/Title/Title"

import { collection, query, getDocs, orderBy, where} from 'firebase/firestore'

import { db } from '../../services/firebaseConnection'

interface CarsProps{
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageProps[];
}

interface ImageProps{
  name: string;
  uid: string;
  url: string;
}

export default function Home(){
  
  const [input,setInput] = useState<string>('')
  const [cars,setCars] = useState<CarsProps[]>([])

  async function getCarros(){
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("created", "desc"))

    getDocs(queryRef)
    .then((snapshot) => {
      const listcars = [] as CarsProps[];

      snapshot.forEach( doc => {
        listcars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          images: doc.data().images,
          uid: doc.data().uid
        })
      })

      setCars(listcars);  
    })
  }

  useEffect(() => {
    getCarros()
  },[])

  async function handleSearchCar(){
    if(input === ''){
      getCarros();
      return;
    }

    setCars([]);

    const q = query(collection(db, "cars"), 
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff")
    )

    const querySnapshot = await getDocs(q)

    const listcars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listcars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid
      })
    })

   setCars(listcars);

  }

  useEffect(() => {
    if (input === ''){
      getCarros();
    }
  },[input])

  return (
    <div className="pt-12 h-[92vh] bg-gray-100">
      <InputSearch handleSearchCar={handleSearchCar} input={input} setSearch={setInput}/>
      <div className="mt-8">
        <Title title="Carros novos e usados em todo o Brasil" center={true} secundary={true} />
        <div className="flex mt-4 flex-wrap justify-center gap-3">
          {cars.map((car) => {
            return (
              <CardCar
                id={car.id}
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
