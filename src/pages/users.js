import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, CardContent, CardHeader, Confirm,Grid,Container} from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import {deleteUser} from 'controllers/userController'
import { useSession } from 'next-auth/react'

export default function Users({users}) {
  const { status,data } = useSession()
  const router = useRouter()
  const [isOpen,setIsOpen] = useState(false)
  const [selectedUser,setSelectedUser] = useState(null)

  console.log(users)
  
  useEffect(()=>{
    if(status==='unauthenticated') router.replace('/')
  },[status])

  if (status==='authenticated'){
    console.log(users)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const handleDelete = () =>{
      close()
      deleteUser(selectedUser)
      router.push('/')
    }

    if(users.length ===0){
    return(
      <Grid centered verticalAlign='middle' columns ='1'style={{heigth: '50vh'}}>
        <Grid.Column textAlign='center'>
          <h1 style={{marginTop:40}}>No hay usuarios registrados</h1>
          <img alt='NO users' style={{maxHeight:300, marginTop:30,marginBottom:20}}
          src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=2000'>
          </img>
        </Grid.Column>
        <Button color='olive'
        onClick={()=>router.push("/users/new")}
        >Añadir Usuario</Button>
      </Grid>
    )
    
    
    } else{
      return (
      <div className={styles.container}>
        <Container style={{padding:40}}>
          <Card.Group itemsPerRow={4}>
            {
              users.map((user)=>(
                <Card key={user._id}>
                  <CardContent>
                    <CardHeader>
                      {user.nombre +' '+ user.apellido}
                    </CardHeader>
                    <Card.Content extra>
                      <Button color='blue'
                      onClick={()=>{
                        router.push(`/users/${user._id}/edit`)
                      }}>Editar</Button>
                      <Button color='red'
                      onClick={()=>{
                        open()
                        setSelectedUser(user)
                      }}
                      >Eliminar</Button>
                    </Card.Content>
                  </CardContent>
                </Card>
              ))
            }
          </Card.Group>
          <Confirm open = {isOpen} onConfirm={handleDelete} onCancel={close}/>

        </Container>   
        <p className={styles.description} style={{fontStyle:'italic'}}>
          Developed by Erik Murminacho{' '}
        </p>
      </div>
    )
  }
  return <div>Cargando</div>
  }
}
export const getServerSideProps = async (context) =>{
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();

  return{
    props:{
      users:data,
    },
  }
}