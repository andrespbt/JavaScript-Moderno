import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/alerta'
const Registrar = () => {
  const [ nombre, setNombre ] = useState ('')
  const [ email, setEmail ] = useState ('')
  const [ password, setPassword ] = useState ('')
  const [ repetirPassword, setRepetirPassword ] = useState ('')
  const [ alerta, setAlerta ] = useState ({})
  const handleSubmit = async e=> {
    e.preventDefault();

    if( [nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true });
      return;
    }

    if( password != repetirPassword ){
      setAlerta({msg: 'Los passwords no son iguales', error: true });
      return;
    }

    if( password.length < 6){ 
      setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true });
      return;
    }

    setAlerta({})

    // Crear usuario en la api

    try {
      const url = "http://localhost:4000/api/veterinarios"
      await axios.post(url, { nombre, email , password })
     setAlerta({ msg: 'Creado correctamente, revisa tu email', error: false})
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }

  }

  const { msg } = alerta
    return (
      <>

         <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu cuenta y administra tus
                <span className="text-black"> pacientes</span>
            </h1>
        </div>
            <div  className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
              {msg && <Alerta
                alerta = {alerta}/>}
            <form 
            onSubmit={handleSubmit}
           >
                <div className="my-5">
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre
                    </label>
                    <input 
                    type="text" 
                    placeholder="Tu Nombre"
                    value={nombre} 
                    onChange={ e => setNombre(e.target.value)}
                    name="" 
                    id=""
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>
                <div className="my-5">
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                    type="Email" 
                    placeholder="Tu Email" 
                    value={email} 
                    onChange={ e => setEmail(e.target.value)}
                    name="" 
                    id=""
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>
                <div className="my-5">
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Password
                    </label>
                    <input 
                    type="Password" 
                    placeholder="Tu Password"
                    value={password} 
                    onChange={ e => setPassword(e.target.value)} 
                    name="" 
                    id=""
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <div className="my-5">
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Repetir Password
                    </label>
                    <input 
                    type="Password" 
                    placeholder="Repite tu Password" 
                    value={repetirPassword} 
                    onChange={ e => setRepetirPassword(e.target.value)}
                    name="" 
                    id=""
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
                </div>

                <input 
                type="submit" 
                value="Crear cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                className='block text-center my-5 text-gray-500'
                to="/"> ¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link 
                className='block text-center my-5 text-gray-500'
                to="/olvide-password"> Olvide mi Password</Link>
            </nav>

            </div>
      </>
    )
  }
  
  export default Registrar