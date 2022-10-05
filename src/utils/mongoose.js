import {connect,connection} from "mongoose";

const dbState = {
    isConnected : false
}

export async function dbConnect(){
    if (!dbState.isConnected){
        const db = await connect(process.env.DB_URL)
        dbState.isConnected = db.connections[0].readyState
        console.log(db.connection.db.databaseName)
    }
    
}

connection.on("connected",()=>{
    console.log("Db connected");
})

connection.on("error",(err)=>{
    console.log(err);
})