//import { Menu,Container, MenuItem, Button, Icon} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession,signOut, signIn } from "next-auth/react"
//import logo from "imgs/playc_logo.jpg"
import Image from "next/image";

export const Navbar =()=>{
    const { data: session } = useSession()
    const router = useRouter()
    console.log(session)
    // return(
    //     <Menu inverted attached>
    //         <Container >
    //             <Menu.Item position="left" >
    //             <Link href='/' style={{fontStyle:"italic",fontWeight:"bold",}}>Incio...
    //                 {/* <Image src={logo} layout="fill" ></Image> */}
    //             </Link>
    //             </Menu.Item>  
    //             { session ? <Menu.Item position="left" >
    //                 <Link href='/users' style={{fontStyle:"italic",fontWeight:"bold"}}>{'Usuarios'}</Link>
    //                 </Menu.Item>:null}
    //             <>
    //             <Menu.Item position="right">
    //             {session ? 
    //                 <Button color="red" onClick={()=>signOut('credentials',{ callbackUrl: 'http://localhost:3000/' })}>
    //                 Cerrar Sesión
    //             </Button>
    //             :
    //             <Button color="green"
    //             onClick={()=>signIn()}>
    //                 Iniciar Sesión
    //             </Button>}</Menu.Item></>
                
    //         </Container>
    //     </Menu>
    // )

    return(
    <div className="navbar">
        <div className="navbar-left">
            <a href='/' style={{fontStyle:"italic",fontWeight:"bold",color:"white"}}>Inicio
            </a>
            { session ? <a href='/gestores/' style={{fontStyle:"italic",fontWeight:"bold"}}>{'Gestores'}</a>
            :null}
        </div>
        <div className="navbar-right">
            {session ? 
            <button style={{backgroundColor:"#a64245"}} onClick={()=>signOut('credentials',{ callbackUrl: 'http://localhost:3000/' })}>
             Cerrar Sesión
            </button>
            :<button style={{backgroundColor:"#17ae42"}}
                onClick={()=>signIn()}
            > Iniciar Sesión</button>}
        </div>
        
    </div>)
}