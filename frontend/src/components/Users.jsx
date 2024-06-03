import { useEffect, useState } from "react";

const Users = ()=>{

    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])

    useEffect(()=>{
        console.log("inside useEffect")
        const fetchUsers = async () =>{
            console.log("inside fetchUsers")
            try{
                console.log("inside try")
                const token = localStorage.getItem("token");
                console.log("token: ",token)
                const res = await axios.get("http://localhost:3000/api/user/bulk"+filter,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                console.log("res is: ",res)
                setUsers(res)
            }catch{
                console.log("inside catch :(")
                setUsers("error fetching users");
            }
        }
        console.log("calling fetchUsers next")
        fetchUsers();

    },[])

    console.log("users array: ",users)
  
    //     {
    //     const token = localStorage.getItem("token");
    //     axios.get("http://localhost:3000/api/v1/user/bulk"+filter,
    //         headers:{
    //             Authorization:`Bearer ${token}`
    //         }
    //     ).then(res =>{
    //         setUsers(res.data.user)
    //     })
    // }

}

export default Users;