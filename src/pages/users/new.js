import React from "react"
import { Button, Form, Grid } from "semantic-ui-react"
import { useState,useEffect } from "react"
import { Router, useRouter } from "next/router"
import {registerUser,getUser,updateUser} from 'controllers/userController'


export default function UserRegisterForm(){

    const {query,push} = useRouter()
    const [newUser,setNewUser] = useState({
        "nombre": "",
        "apellido": "",
        "email": "",
        "fechaNacimiento": "",
        "clave": "",
        "tipo": 1
    })

    useEffect(()=>{
        if(query.id) getUser(query)
    },[])

    const [errors,setErrors] = useState({})

    const validate = () =>{
        const errors = {}
        if (!newUser.nombre) errors.nombre = "Se debe ingresar un nombre"
        if (!newUser.apellido) errors.apellido = "Se debe ingresar un apellido"
        if (!newUser.email) errors.email = "Se debe ingresar un email"
        if (!newUser.fechaNacimiento) errors.fechaNacimiento = "Se debe ingresar una fecha de nacimiento"
        if (!newUser.clave) errors.clave = "Se debe ingresar un clave"
        if (!newUser.tipo) errors.tipo = "Se debe seleccionar un tipo"
        return errors
    }

    const handleSubmit = async (form) =>{
        form.preventDefault();
        let errors = validate();

        if(Object.keys(errors).length) return setErrors(errors)
        if(query.id){
            await updateUser({query,newUser})
        }else{
            await registerUser(newUser)
        }
        
        await push('/')
    }


    const handleChange = (e) => setNewUser({...newUser,[e.target.name]:e.target.value})

    return(
      <Grid
        centered verticalAlign="middle" columns="3" style={{height:"80vh"}}
      >
        <Grid.Row>
            <Grid.Column >
                <h2>{query.id? 'Actualizar Usuario':'Registro de usuario'}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Input name="nombre" label="Nombre" placeholder="Nombre"
                    onChange={handleChange}
                    value={newUser.nombre}
                    error ={errors.nombre? {content:'Ingrese un nombre'}: null }
                    />
                    <Form.Input name="apellido" label="Apellido" placeholder="Apellido"
                    onChange={handleChange}
                    value={newUser.apellido}
                    error ={errors.apellido? {content:'Ingrese un apellido'}: null }
                    />
                    <Form.Input name="email" label="Email" placeholder="example@mail.com"
                    onChange={handleChange}
                    value={newUser.email}
                    error ={errors.email? {content:'Ingrese un email'}: null }
                    />
                    <Form.Input name="fechaNacimiento"label="Fecha Nacimiento" placeholder="yyyy/mm/dd"
                    onChange={handleChange}
                    value={newUser.fechaNacimiento}
                    error ={errors.fechaNacimiento? {content:'Ingrese su fecha nacimiento'}: null }
                    />
                    <Form.Input name="clave" label="Constraseña" placeholder="Min 8 caracteres"
                    onChange={handleChange}
                    value={newUser.clave}
                    error ={errors.clave? {content:'Es necesaria una contraseña'}: null }
                    />
                    <Form.Input name="tipo" label="Tipo" placeholder="1/2"
                    onChange={handleChange}
                    value={newUser.tipo}
                    error ={errors.tipo? {content:'Debe seleccionar un tipo'}: null }
                    />
                    <Button color="olive" >
                        {query.id? 'Actualizar ':'Registrar'}</Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}