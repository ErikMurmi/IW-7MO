import { Button, Form, Grid, GridRow,butt, Label } from "semantic-ui-react";
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router";

export default function Index(){
    const { data: session } = useSession()
    const {router,query} = useRouter()
    console.log('Sesion '+session)
    if (session) {
        //console.log('usuario '+ session.user.email)
        return (<>
        <header><title>Home</title></header>
        
          <h1 className={styles.title}>
            Bienvenido <a>{session.user.email}</a>
          </h1>
          <img height={600} style={{marginLeft:300}} className="center"
          src='https://static.vecteezy.com/system/resources/previews/002/219/063/original/sports-stadium-on-white-background-hand-drawn-illustration-vector.jpg'>
          </img>
          </>
        )
    }else{
      return (
        <div style={{ height:'100vh'}}>
          <h1 className={styles.title} style={{color:"green"}}>
            PLAYC ADMIN
          </h1>
        </div>
      )
    }
}