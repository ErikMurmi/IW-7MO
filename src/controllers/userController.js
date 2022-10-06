export const deleteUser = async(selectedUser)=>{
    try{
      await fetch(`http://localhost:3000/api/users/${selectedUser._id}`,{
      method:"DELETE",})
    }catch (error){
      console.log(error)
    }
}

export const registerUser = async (newUser)=>{
    try{
        await fetch('http://localhost:3000/api/users',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newUser)
        })
    }catch(error){
        console.log(error)
    }
  }
  
  export const updateUser = async ({query,newUser})=>{
    try{
        await fetch('http://localhost:3000/api/users/'+query.id,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(newUser)
        })
    }catch(error){
        console.log(error)
    }
  }
  
  export const getUser = async(query)=>{
    const res = await fetch("http://localhost:3000/api/users/"+query.id)
    const data = await res.json()
    setNewUser(data)   
  }