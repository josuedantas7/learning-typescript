import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import Title from '../../components/Title/Title'

import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../../components/Footer'

interface CarsProps{
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  km: string;
  description: string;
  owner: string;
  price: string | number;
  city: string;
  whatsapp: string;
  images: ImageProps[];
}

interface ImageProps{
  name: string;
  uid: string;
  url: string;
}

const CarDetail = () => {
  const { id } = useParams<{ id: string }>()

  const [car,setCar] = useState<CarsProps>()
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  

  useEffect(() => {
    async function getCar(){
      if (id) {
        const carRef = doc(db, "cars", id)
        const docSnap = await getDoc(carRef)
        if (docSnap.exists()) {
          setCar(docSnap.data() as CarsProps)
        } else {
          console.log("Carro não encontrado");
        }
      }
    }
    getCar()
  },[id])

  useEffect(() => {
    console.log(car);
  },[car])

  useEffect(() => {

    function handleResize(){
      if(window.innerWidth < 720){
        setSliderPerView(1);
      }else{
        setSliderPerView(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize)

    return() => {
      window.removeEventListener("resize", handleResize)
    }

  }, [])

  function redirect(telefone : string){
    window.open(`https://api.whatsapp.com/send?phone=55${telefone}&text=Olá, tenho interesse no seu carro!`, '_blank')
  }

  return (
    <div className='h-[92vh]'>
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map( image => (
            <SwiperSlide key={image.name}>
              <img
                src={image.url}
                className="w-full h-96 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {car && (
          <div className='mx-auto mt-8 bg-white rounded-lg p-4 flex flex-col gap-4 w-[95%]'>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <Title title={car.name} primary={true} />
                  <Title title={`R$ ${car.price}`} primary={true} />
                </div>
                <p>{car.model}</p>
              </div>
              <div className='flex gap-10'>
                <div>
                  <label htmlFor="">Cidade</label>
                  <p className='font-bold'>{car.city}</p>
                </div>
                <div>
                  <label htmlFor="">Ano</label>
                  <p className='font-bold'>{car.year}</p>
                </div>
                <div>
                  <label htmlFor="">Cambio</label>
                  {car.model.toLowerCase().includes('automatico') ? (
                    <p className='font-bold'>Automatico</p>
                  ) : (
                    <p className='font-bold'>Manual</p>
                  )}
                </div>
              </div>
              <div>
                <label className='font-bold' htmlFor="">Descrição</label>
                <p>{car.description}</p>
              </div>
              <div>
                <label className='font-bold' htmlFor="">Contato</label>
                <p>{car.whatsapp}</p>
              </div>
              <button onClick={() => redirect(car.whatsapp)} className='w-full rounded-lg py-2 text-white font-bold bg-green-500'>
                <div className='flex justify-center gap-4 items-center'>
                  <FaWhatsapp size={25} />
                  <p>Enviar mensagem whatsapp</p>
                </div>
              </button>
          </div>
        )}
        <Footer/>
    </div>
  )
}

export default CarDetail
