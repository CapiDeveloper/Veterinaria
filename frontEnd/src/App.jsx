import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './paginas/login';
import Registrar from './paginas/registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login />} />
          <Route path='registrar-cuenta' element={<Registrar/>} />
          <Route path='olvide-password' element={<OlvidePassword/>} />
          <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
