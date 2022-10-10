import { Button, Form, Grid, GridRow, Label } from "semantic-ui-react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Index(){
    const { data: session } = useSession()
    console.log('Sesion '+session)
    if (session) {
        //console.log('usuario '+ session.user.email)
        return (
          <div style={{color:'#1e1e1e'}}>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </ div>
        )
    }else{
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
    }
      
    /*return(<>
        <Grid 
            style={{marginTop:30}}
            centered columns='3' verticalAlign="middle">
            <h2>Login</h2>
            <GridRow>
                <Grid.Column textAlign="left">     
                    <Form>
                        <label>Email
                            <input type={"email"} placeholder="example@mail.com">
                            </input>
                        </label>
                        <label>
                            Constraseña
                            <input type={"password"}
                            placeholder="Min 8 Caracteres">
                            </input>
                        </label>
                        <Button class="ui secondary button">
                            Login
                        </Button>
                    </Form>           
                </Grid.Column>
            </GridRow>
        </Grid>
    </>)*/
}