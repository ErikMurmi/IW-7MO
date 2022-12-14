import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {findUserByCredentials} from 'controllers/userController'
import SignIn from "../../auth/singin";

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type:'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email"},
        clave: {  label: "Clave", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await findUserByCredentials(credentials)
        console.log(user)
        console.log('Login: '+ user.email)
        if (!user.email) {
          toast('Credenciales no válidas',{type:'error'})
          // Any object returned will be saved in `user` property of the JWT
          
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          console.log('test')
          return user
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],pages: {
    //signIn: 'auth/singin',
    //signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
  

}

export default NextAuth(authOptions)
