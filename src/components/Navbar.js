import { Menu,Container, MenuItem, Button} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession,signOut, signIn } from "next-auth/react"

export const Navbar =()=>{
    const { data: session } = useSession()
    const router = useRouter()
    console.log(session)
    return(
        <Menu inverted attached>
            <Container >
                <Menu.Item position="left" >
                    <Link href='/' style={{fontStyle:"italic",fontWeight:"bold",}}>{'Home  '}</Link>
                </Menu.Item>  
                { session===null ? null:<Menu.Item position="left" >
                    <Link href='/users' style={{fontStyle:"italic",fontWeight:"bold"}}>{'Usuarios'}</Link>
                    </Menu.Item>}
                <>
                <Menu.Item position="right">
                <Button color="twitter" onClick={()=>router.push("/users/new")}
                    style={{marginRight:20}}>
                        Registrar usuario
                    </Button>
                {session ? 
                    <Button color="red" onClick={()=>signOut('credentials',{ callbackUrl: 'http://localhost:3000/' })}>
                    Cerrar Sesión
                </Button>
                :<Menu.Item position="right">
                <Button color="green"
                onClick={()=>signIn()}>
                    Log In
                </Button></Menu.Item>}</Menu.Item></>
                
            </Container>
        </Menu>
    )
}