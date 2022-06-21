import {useState,useEffect,createContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider =  ({children})=>{
    
    const [cargando,setCargando] = useState(true)
    const [auth,setAuth] = useState({});

    useEffect(() => {
        

        const autenticarUsuario = async()=>{

            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false)
                return;
            };

            const url = 'http://localhost:4000/api/veterinarios/perfil';
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await axios(url,config);
                console.log(data);
                setAuth(data);

            } catch (error) {
                console.log('No se logra conectar al backend');
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    const cerrarSession = ()=>{
        localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext;