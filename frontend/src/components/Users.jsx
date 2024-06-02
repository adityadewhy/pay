import { useEffect, useState } from "react";

const Users = ()=>{

    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/user/bulk"+filter,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setUsers(res.)
            }catch{
                setUsers("error fetching users");
            }
        }
        fetchUsers();

    },[filter])
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