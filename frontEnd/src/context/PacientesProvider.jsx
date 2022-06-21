import {useState,useEffect,createContext} from "react";
import axios from "axios";

const PacientesContext = createContext();

export const PacientesProvider = ({children})=>{

    const [pacientes,setPacientes] = useState([]);

    // Cuando cargue el DOM se cargaran los registros de pacientes
    useEffect(() => {
        const obtenerPacientes = async()=>{
            try {
               
                const token = localStorage.getItem('token');
                if(!token) return;

                // ** Realizar la consulta
                // Configuracion de permiso header
                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = 'http://localhost:4000/api/pacientes/listar';
                const {data} = await axios.get(url,config);

                setPacientes(data.mensaje);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [])
    

    // Funcion para guardar paciente
    const guardarPaciente = async({nombre,propietario,email,telefono,fecha,hora,sintomas})=>{

        const token = localStorage.getItem('token');

        const info = new FormData();
        info.append('nombre', nombre);
        info.append('propietario', propietario);
        info.append('email', email);
        info.append('telefono', telefono);
        info.append('fecha', fecha);
        info.append('hora', hora);
        info.append('sintomas', sintomas);

        // Configuracion de permiso header
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const url = 'http://localhost:4000/api/pacientes/agregar';
            const {data} = await axios.post(url,info,config);
            if (data.valido === true) {
                setPacientes([data.mensaje,...pacientes]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}
export default PacientesContext;