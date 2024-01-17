import Header_Dashboard from '../../../components/header-dashboard/'
import Footer from '../../../components/Footer'
import InputNewCar from '../../../components/InputNewCar'
import { ChangeEvent, useContext, useState } from 'react'
import { FiTrash, FiUpload } from 'react-icons/fi';
import Toastfy from '../../../components/Toast';
import { AuthContext } from '../../../contexts/AuthContext';

import { v4 as uuidV4 } from 'uuid'

import { storage, db } from '../../../services/firebaseConnection'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

interface NewCarProps{
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

interface ImageItemProps{
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

interface ToastfyProps {
  success?: boolean;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
  message: string;
}

const New = () => {

  const { user } = useContext(AuthContext)

  const [name, setName] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [km, setKm] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [images, setImages] = useState<ImageItemProps[]>([])

  const [toastData, setToastData] = useState<ToastfyProps>({
    success: false,
    error: false,
    info: false,
    warning: false,
    message: '',
  });


  function onSubmit(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    if (images.length === 0) {
      setToastData({ warning: true, message: 'Envie pelo menos uma imagem!' });
      return
    }

    const carListImages = images.map((img) => {
      return {
        uid: img.uid,
        name: img.name,
        url: img.url
      }
    })

    const data : NewCarProps = {
      owner: user?.name,
      uid: user?.uid,
      created: new Date(),
      name,
      model,
      year,
      km,
      price,
      city,
      whatsapp,
      description,
      images: carListImages
    }

    addDoc(collection(db, 'cars'), data)
    .then(() => {
      setToastData({ success: true, message: 'Carro cadastrado com sucesso!' });
      setTimeout(() => {
        clearLabels()
      },1000)
    })
    .catch((err) => {
      console.log(err)
      setToastData({ error: true, message: 'Erro ao cadastrar carro!' });
    })
  }

  async function handleFile(e : ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      console.log(image)
      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        await handleUpload(image)
      } else {
        setToastData({ warning: true, message: 'Envie uma imagem jpeg ou png!' });
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return
    }

    const currentUid = user?.uid
    const uidImage = uuidV4()

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image)
    .then((snapShop) => {
      getDownloadURL(snapShop.ref)
      .then(url => {
        const newImage = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url
        }
        setImages([...images, newImage])
      })
    })
  }

  async function removeImage(image: ImageItemProps) {
    const currentUid = user?.uid
    const uploadRef = ref(storage, `images/${currentUid}/${image.name}`)

    await deleteObject(uploadRef)
    .then(() => {
      const newImages = images.filter(img => {
        return img.name !== image.name
      })
      setImages(newImages)
    })
  }


  function clearLabels() : void{
    setName('')
    setModel('')
    setYear('')
    setKm('')
    setPrice('')
    setCity('')
    setWhatsapp('')
    setDescription('')
    setImages([])
  }

  return (
    <div className='pt-4 h-[92vh]'>
      <Header_Dashboard/>
      <div className="w-full mt-8 bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input onChange={handleFile} type="file" accept="image/*" className="opacity-0 cursor-pointer" />
          </div>
        </button>
        {images && images.map((image, index) => (
          <div key={index} className="w-48 h-32 md:w-48 flex items-center justify-center relative">
            <button className='absolute'>
              <FiTrash onClick={() => removeImage(image)} size={28} color='#FFF' />
            </button>
            <img src={image.previewUrl} className="w-full h-full rounded-lg object-cover" />
          </div>
        ))}
      </div>
      <div className='bg-white p-4 rounded-lg mt-4'>
        <InputNewCar label='Nome do carro' value={name} onChange={setName}/>
        <InputNewCar label='Modelo' value={model} onChange={setModel}/>
        <div className='flex w-full gap-4'>
          <InputNewCar label='Ano' value={year} onChange={setYear}/>
          <InputNewCar label='Km rodados' value={km} onChange={setKm}/>
        </div>
        <InputNewCar label='Valor em R$' value={price} onChange={setPrice}/>
        <InputNewCar label='Cidade' value={city} onChange={setCity}/>
        <InputNewCar label='Whatsapp' value={whatsapp} onChange={setWhatsapp}/>
        <div>
          <label className='font-bold'>Descrição</label>
          <textarea value={description} rows={3} onChange={(e) => setDescription(e.target.value)} className='w-full resize-none px-2 py-1 rounded-lg border-2' />
        </div>
      <button onClick={(e) => onSubmit(e)} className='bg-black mt-3 font-bold text-white py-1 w-full rounded-md'>Cadastrar</button>
      </div>
      <Toastfy {...toastData} />
      <Footer/>
    </div>
  )
}

export default New
