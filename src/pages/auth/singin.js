import {signIn} from "next-auth/react"
import { Grid,Label,GridRow,Form,Button } from "semantic-ui-react"

export default function SignIn(){
    return(<>
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
                        <Button class="ui secondary button" onClick={()=>{signIn()}}>
                            Login
                        </Button>
                    </Form>           
                </Grid.Column>
            </GridRow>
        </Grid>
    </>)
}
