import { Button, Form, Grid, GridRow, Label } from "semantic-ui-react";

export default function Home(){
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
                        <Button class="ui secondary button">
                            Login
                        </Button>
                    </Form>           
                </Grid.Column>
            </GridRow>
        </Grid>
    </>)
}