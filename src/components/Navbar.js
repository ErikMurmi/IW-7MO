import { Menu,Container, MenuItem, Button} from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

export const Navbar =()=>{

    const router = useRouter()
    return(
        <Menu inverted attached>
            <Container >
                <Menu.Item>
                    <Link href='/'>Usuarios</Link>
                </Menu.Item>
                <Menu.Item position="right">
                    <Button color="twitter" onClick={()=>router.push("/users/new")}>
                        Registrar usuario
                    </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}