import { Link } from "react-router-dom";

export default function Notfound(){
    return(
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-white font-extrabold text-4xl">Pagina nao existe :'(</h1>
        <Link to={'/'} className="text-white underline mt-4">Voltar para home</Link>
      </div>
    )
  }