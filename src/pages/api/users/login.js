import { dbConnect } from "utils/mongoose"
import User from "models/User"

dbConnect()

export default async(req,res) =>
{
    const {method,body} = req
    let data = {}
    switch(method){
        case "POST":
            let email = body.email
            let password = body.clave
            try{
                if (email.length > 0 && password.length > 0) {
                    data = {
                        email: email
                    };
                }
                const user = await User.findOne(data)
                if(!user) return res.status(400).json({msg: "User not found"})
                if(user.clave === password) 
                    return res.status(200).json(user)
                else 
                    return res.status(401).json({msg:"Incorrect password"})
                    
            }catch(error){
                return res.status(500).json({msg:"User does not exits"})
            }  
        default:
            return res.status(400).json({msg:"This method is not available"})
    }
}