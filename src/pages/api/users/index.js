import {dbConnect} from '../../../utils/mongoose'
import { unstable_getServerSession , useSession} from "next-auth/next"
import { authOptions } from 'pages/api/auth/[...nextauth]'
import User from 'models/User'

dbConnect()

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req,res){
  const {method,body} = req
  const session = await unstable_getServerSession(req, res, authOptions)
  //const {status,data} = useSession()
  console.log('La sesion es '+ session)
  /*
    */
  switch(method){
    case "GET":
      try{
        if(session === null){
          return res.status(401).json({error: "You must be signed in to view the protected content on this page."});
        }
        const users = await User.find()
        return res.status(200).json(users)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    case "POST":
      try{
        console.log(body)
        const newUser = new User(body)
        const savedUser = await newUser.save()
        return res.status(201).json(savedUser)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    default:
      return res.status(400).json({
        msg:'This method does not exits'
      })
  }
  console.log(req.method,req.url)
}