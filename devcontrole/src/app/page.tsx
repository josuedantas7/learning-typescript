import imageHome from '@/assets/home.svg'
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <main className='w-full flex justify-center mt-8 max-[420px]:mt-0'>
      <Link className='w-full mx-auto' href={'/login'}>
        <Image alt='Imagem Home' className='w-[600px] mx-auto h-[550px] max-[720px]:w-[90%] max-[720px]:h-[500px]' src={imageHome} />
      </Link>
    </main>
  );
}
