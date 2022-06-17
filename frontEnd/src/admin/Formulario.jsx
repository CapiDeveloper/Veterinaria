const Formulario = () => {
  return (
    <>
        <p className="text-2xl text-center mb-10 uppercase font-bold">
            Añade tus pacientes y <span className="font-black text-indigo-600">administralos</span>
        </p>
        <form 
            className="bg-white py-10 px-5 mb-10 md:mb-0 shadow-2xl rounded-md"
        >
            <div className="mb-5">
                <label 
                    htmlFor="mascota" 
                    className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                    type="text" 
                    id="mascota"
                    autoComplete="off"
                    placeholder="Nombre de la mascota"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario" 
                    className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input 
                    type="text" 
                    id="propietario"
                    autoComplete="off"
                    placeholder="Nombre del propietario"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email" 
                    className="text-gray-700 uppercase font-bold">Email Propietario</label>
                <input 
                    type="email" 
                    id="email"
                    autoComplete="off"
                    placeholder="Email"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div> 
            <div className="mb-5">
                <label 
                    htmlFor="fecha" 
                    className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input 
                    type="date" 
                    id="fecha"
                    autoComplete="off"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas" 
                    className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea 
                    id="sintomas"
                    autoComplete="off"
                    placeholder="Describe los sintomas"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <input type="submit" value="Agregar Paciente" className="bg-indigo-600 text-white p-3 w-full uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors" />
        </form>
    </>
  )
}

export default Formulario