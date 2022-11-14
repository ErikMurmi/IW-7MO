import React from "react"
import { Button, Form, Grid } from "semantic-ui-react"
import { useState,useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import {getUser} from 'controllers/userController'
import { registerGestor,updateGestor,getGestor } from "controllers/gestoresController"
import { ROUTES_MANIFEST } from "next/dist/shared/lib/constants"


export default function UserRegisterForm(){
    const { status} = useSession()
    const router = useRouter()
    const {query,push} = useRouter()
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
        //console.log(await getUser(query))
    }

    useEffect(()=>{
        if(status==='unauthenticated') router.replace('/')
      },[status])

    useEffect(()=>{
        if(query.id) checkUserReceived(query)
    },[])

    const [errors,setErrors] = useState({})

    const validate = () =>{
        const errors = {}
        if (!newUser.nombre) errors.nombre = "Se debe ingresar un nombre"
        if (!newUser.apellido) errors.apellido = "Se debe ingresar un apellido"
        if (!newUser.email) errors.email = "Se debe ingresar un email"
        if (!newUser.fechaNacimiento) errors.fechaNacimiento = "Se debe ingresar una fecha de nacimiento"
        if (!newUser.numero) errors.clave = "Se debe ingresar un número para el contacto"
        if (!newUser.clave) errors.clave = "Se debe ingresar un contraseñia"
        if (!newUser.tipo) errors.tipo = "Se debe seleccionar un tipo"
        return errors
    }

    const handleSubmit = async (form) =>{
        form.preventDefault();
        console.log('before submit',newUser)
        //let errors = validate();

        //if(Object.keys(errors).length) return setErrors(errors)
        if(query.id){
            console.log('edit mode ',newUser)
            const newGestor = newUser
            try{
                await updateGestor({query,newGestor})
            }catch(error){
                alert(error)
            }
        }else{
            console.log('register method')
            
            let result = await registerGestor(newUser)
            console.log(result)
            // if(result.error){
            //     alert(result)
            // }
            
        }
        
        //await push('/')
    }


    const handleChange = (e) => setNewUser({...newUser,[e.target.name]:e.target.value})

    return(<div>
        <h2>{query.id? 'Actualizar gestor':'Agregar un gestor'}</h2>
        <form onSubmit={handleSubmit} style={{minWidth:'200px',maxWidth:'300px'}}>
            <label>Nombres</label>
            <input name="nombres" type="text" value={newUser.nombres} onChange={handleChange}></input>
            <label>Apellidos</label>
            <input name="apellidos" type="text" value={newUser.apellidos} onChange={handleChange}></input>
            <label>Cedula</label>
            <input name="cedula" type="number" value={newUser.cedula} onChange={handleChange}></input>
            <label>Numero</label>
            <input name="numero" type="tel" value={newUser.numero} onChange={handleChange}></input>
            <label>Email</label>
            <input name="email" type="email" value={newUser.email} onChange={handleChange}></input>
            <label>Constraseña</label>
            <input name="clave" type="password" value={newUser.clave} onChange={handleChange}></input>
            <input type="submit" value={query.id? 'Actualizar ':'Registrar'}></input>
        </form>
    </div>)

    // return(
    //   <Grid
    //     centered verticalAlign="middle" columns="3" style={{height:"80vh"}}
    //   >
    //     <Grid.Row>
    //         <Grid.Column >
    //             <h2>{query.id? 'Actualizar Usuario':'Agregar un gestor'}</h2>
    //             <Form onSubmit={handleSubmit}>
    //                 <Form.Input name="nombre" label="Nombres" placeholder="Escribe los nombres"
    //                 onChange={handleChange}
    //                 value={newUser.nombre}
    //                 error ={errors.nombre? {content:'Ingrese un nombre'}: null }
    //                 />
    //                 <Form.Input name="apellido" label="Apellidos" placeholder="Escribe los apellidos"
    //                 onChange={handleChange}
    //                 value={newUser.apellido}
    //                 error ={errors.apellido? {content:'Ingrese un apellido'}: null }
    //                 />
    //                 <Form.Input name="numero" label="Número" placeholder="09xxxxxxxx"
    //                 onChange={handleChange}
    //                 value={newUser.numero}
    //                 error ={errors.numero? {content:'Ingrese un email'}: null }
    //                 />
    //                 <Form.Input name="email" label="Email" placeholder="example@mail.com" type="email"
    //                 onChange={handleChange}
    //                 value={newUser.email}
    //                 error ={errors.email? {content:'Ingrese un email'}: null }
    //                 />
    //                 {query.id?null:<Form.Input name="clave" type="password" label="Constraseña" placeholder="Min 8 caracteres"
    //                 onChange={handleChange}
    //                 value={newUser.clave}
    //                 error ={errors.clave? {content:'Es necesaria una contraseña'}: null }
    //                 />}
    //                 <Button onClick={()=>{handleSubmit}} color="olive" >
    //                     {query.id? 'Actualizar ':'Registrar'}</Button>
    //             </Form>
    //         </Grid.Column>
    //     </Grid.Row>
    //   </Grid>
    // )
}