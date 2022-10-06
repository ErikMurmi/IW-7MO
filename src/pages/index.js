import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, CardContent, CardHeader, Confirm,Grid} from 'semantic-ui-react'
import { useState } from 'react'
import { Router, useRouter } from 'next/router'
import {deleteUser} from 'controllers/userController'

export default function Home({users}) {
  console.log(users)
  const [isOpen,setIsOpen] = useState(false)
  const [selectedUser,setSelectedUser] = useState(null)
  const router = useRouter()
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
        <Head>
          <title>UsCrud-Home</title>
          <meta name="description" content="Developed by Erik Murminacho" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>
          USERS CRUD <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <container style={{padding:40}}>
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

        </container>
        
        <p className={styles.description} style={{fontStyle:'italic'}}>
          Develop by Erik Murminacho{' '}
        </p>
  
          
      </div>
    )
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