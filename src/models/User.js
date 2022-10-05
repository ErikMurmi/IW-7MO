import { Schema,model,models } from "mongoose";
 
const userSchema = new Schema({
    nombre:String,
    apellido:String,
    email:String,
    fechaNacimiento:Date,
    clave:{type:String,required:true},
    tipo: Number
},{
    timestamps:true,
    versionKey:false
})

export default models.User || model('User',userSchema)