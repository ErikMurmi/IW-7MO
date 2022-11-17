import React from "react"
import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { registerGestor,updateGestor,getGestor } from "controllers/gestoresController"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export default function UserRegisterForm(){
    const { status} = useSession()
    const router = useRouter()
    const {query} = useRouter()
    const [submitError,setSubmitError] = useState('none')

    const [newUser,setNewUser] = useState({
        nombres: "",
        apellidos: "",
        cedula:"",
        numero:"",
        email: "",
        clave: "",
        tipo: 2
    })

    const checkUserReceived = async () =>{
        setNewUser(await getGestor(query))
    }

    useEffect(()=>{
        if(status==='unauthenticated') router.replace('/')
      },[status])

    useEffect(()=>{
        if(query.id) checkUserReceived(query)
    },[])

    useEffect(()=>{
        console.log(submitError)
    },[submitError])

    const [errors,setErrors] = useState({
        nombres: "",
        apellidos: "",
        cedula:"",
        numero:"",
        email: "",
        clave: ""
    })

    const validate = () =>{
        const errors = {}
        if (!newUser.nombres) errors.nombres = "Se debe ingresar el nombre"
        if (!newUser.apellidos) errors.apellidos = "Se deben ingresar los apellidos"
        if (!newUser.email) errors.email = "Se debe ingresar un email"
        if (!newUser.cedula) errors.cedula = "Se debe ingresar una cédula válida"
        if (!newUser.numero) errors.numero = "Se debe ingresar un número para el contacto"
        if (!newUser.clave) errors.clave = "Se debe ingresar un contraseñia"
        setErrors(errors)
    }

    const handleSubmit = async (form) =>{
        form.preventDefault();
        validate();

        //if(Object.keys(errors).length) return setErrors(errors)
        if(query.id){
            console.log('edit mode ',newUser)
            const newGestor = newUser
            try{
                await updateGestor({query,newGestor})
                await router.push('/gestores')
            }catch(error){
                alert(error)
            }
        }else{
            let result = await registerGestor(newUser)
            if(!result.ok){
                console.log('estoy aqui')
                toast("Campos inválidos, revisa los valores ingresados")
            }else{
                await router.push('/gestores')
            }
        }
    }


    const handleChange = (e) => {
        setNewUser({...newUser,[e.target.name]:e.target.value})
        setErrors({...errors,[e.target.name]:""})
    }

    return(<div>
        
        <form className="material-form" onSubmit={handleSubmit} style={{minWidth:'200px',maxWidth:'500px'}}>
            <h2>{query.id? 'Actualizar gestor':'Agregar un gestor'}</h2>
            <label>Nombres</label>
            <input name="nombres" type="text" value={newUser.nombres} onChange={handleChange}></input>
            {errors.nombres?<p className="error-msg">{errors.nombres}</p>:null}
            <label>Apellidos</label>
            <input name="apellidos" type="text" value={newUser.apellidos} onChange={handleChange}></input>
            {errors.apellidos?<p className="error-msg">{errors.apellidos}</p>:null}
            <label>Cedula</label>
            <input name="cedula" type="number" value={newUser.cedula} onChange={handleChange}></input>
            {errors.cedula?<p className="error-msg">{errors.cedula}</p>:null}
            <label>Numero</label>
            <input name="numero" type="tel" value={newUser.numero} onChange={handleChange}></input>
            {errors.numero?<p className="error-msg">{errors.numero}</p>:null}
            <label>Email</label>
            <input name="email" type="email" value={newUser.email} onChange={handleChange}></input>
            {errors.email?<p className="error-msg">{errors.email}</p>:null}
            <label>Constraseña</label>
            <input name="clave" type="password" value={newUser.clave} onChange={handleChange}></input>
            <input id="submit-btn" type="submit" value={query.id? 'Actualizar ':'Registrar'}></input>
        </form>
        <ToastContainer />
    </div>)

}