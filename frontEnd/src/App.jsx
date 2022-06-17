import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Layouts
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

// Rutas publicas
import Login from './paginas/login';
import Registrar from './paginas/registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import RecuperarPassword from './paginas/RecuperarPassword';

// Rutas paginas protegidas
import AdministrarPacientes from './admin/AdministrarPacientes';

// Context API
import {AuthProvider} from './context/AuthProvider';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas no protegidas */}
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>} />
            <Route path='registrar-cuenta' element={<Registrar/>} />
            <Route path='olvide-password' element={<OlvidePassword/>} />
            <Route path='recuperar-password/:token' element={<RecuperarPassword/>} />
            <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>} />
          </Route>
            {/* Rutas protejidas */}
          <Route path='/admin' element={<RutaProtegida />}>
            <Route index element={<AdministrarPacientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
