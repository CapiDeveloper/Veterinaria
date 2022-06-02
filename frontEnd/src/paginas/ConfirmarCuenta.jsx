import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
const ConfirmarCuenta = () => {
  
  // Obtener parametro URL
  const params = useParams();
  const {token} = params;
  console.log(token);

  // Enviar url al backend
  useEffect(()=>{
      const confirmarCuenta = async()=>{
        const url = `http://localhost:4000/api/veterinarios/confirmar?token=${token}`;
        const respuesta = await fetch(url);
        const resultado = respuesta.json();
        console.log(resultado);
      }
      confirmarCuenta();
  },[]);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
            Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-xl p-3 rounded-xl'>
        
      </div>
    </>
  )
}

export default ConfirmarCuenta