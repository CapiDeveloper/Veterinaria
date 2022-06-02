import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
            Recupera tu acceso y no pierdas tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
          <form className="mt-20 md:mt-5 shadow-xl p-3 rounded-xl">
            <div className="my-5">
              <label className="uppercase block text-gray-600 text-xl font-bold">
                Email
              </label>
              <input type="email" placeholder="Tu correo" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
            </div>
            <input type="submit" value="Recuperar Cuenta" className="p-3 bg-indigo-700 w-full text-white
                  uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto rounded-xl"/>
          </form>

          <nav className="mt-10 justify-confirmar md:flex md:justify-around md:gap-2">
            <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Iniciar Session</Link>
            <Link className="block text-center my-5 text-gray-500" to="/registrar-cuenta">¿No tienes una cuenta? Registrate</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword