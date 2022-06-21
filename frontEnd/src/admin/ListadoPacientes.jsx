import usePacientes from "../hooks/usePacientes"

const ListadoPacientes = () => {

    const {pacientes} = usePacientes();

  return (
    <>
        { pacientes.length? 
        (<>
          <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
          <p className="text-xl mt-2 mb-10 text-center">Administra tus <span className="font-bold text-indigo-600"> pacientes y citas</span></p>
        </>)
        :(
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-2 mb-10 text-center">Comienza agregando pacientes <span className="font-bold text-indigo-600">y apareceran en este lugar</span></p>
        </>)}
    </>
  )
}

export default ListadoPacientes