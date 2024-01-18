import { useContext, useEffect, useState } from 'react'
import Header_Dashboard from '../../components/header-dashboard'
import Footer from '../../components/Footer'
import { AuthContext } from '../../contexts/AuthContext'

import { useNavigate  } from 'react-router-dom'

import Toastfy from '../../components/Toast'
import CardCar from '../../components/CardCar'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

interface ToastfyProps {
  success?: boolean;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
  message: string;
}

interface CarProps{
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps{
  name: string;
  uid: string;
  url: string;
}

const Dashboard = () => {
  
  const { user,signed,loading } = useContext(AuthContext)

  const navigate = useNavigate()
  const [cars,setCars] = useState<CarProps[]>([])
  const [toastData, setToastData] = useState<ToastfyProps>({
    success: false,
    error: false,
    info: false,
    warning: false,
    message: '',
  });

  useEffect(() => {
    if (loading === false) {
      if (!signed) {
        setToastData({ warning: true, message: 'Faça login para acessar essa página' });
        setTimeout(() => {
          navigate('/')
        },1000)
      }
    }
  },[loading,signed,navigate])

  useEffect(() => {
    function getCarros(){
      if (!user?.uid) {
        return
      }
      const q = query(collection(db, "cars"), where("uid", "==", user?.uid))
      getDocs(q).then((snapshot) => {
        const listcars = [] as CarProps[];

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
    getCarros()
  },[user])

  async function handleDeleteCar(id: string){
    const docRef = doc(db, "cars", id)
    await deleteDoc(docRef);
    setCars(cars.filter(car => car.id !== id))
  }

  return (
    <div className='pt-4 h-[92vh] bg-gray-100'>
        <Header_Dashboard />
        {
          cars.length > 0 ? (
            <>
              <div className='flex flex-wrap justify-center gap-3 mt-4'>
                {cars.map((car) => {
                  return (
                    <CardCar
                      key={car.uid}
                      id={car.id}
                      name={car.name}
                      year={car.year}
                      km={car.km}
                      price={car.price}
                      city={car.city}
                      fotoCarro={car.images[0].url}
                      owner={true}
                      handleDeleteCar={handleDeleteCar}
                    />
                  )
                })}
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-[80vh]'>
              <h1 className='text-2xl font-bold'>Você não possui nenhum carro cadastrado</h1>
              <button onClick={() => navigate('/dashboard/new')} className='mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'>Adicionar carro</button>
            </div>
          )}
        <Footer/>
        <Toastfy {...toastData} />
    </div>
  )
}

export default Dashboard
