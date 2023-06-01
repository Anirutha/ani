import React, { useEffect, useState } from "react"
import Base from "../Base/Base"
import { Button, IconButton, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
const UserPage = () =>{
    const navigate = useNavigate()
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login", {replace:true})
        }
        let token = localStorage.getItem("token")
        const fetchUserData = async()=>{
         const res = await fetch(`http://localhost:7070/api/notes/user`, {
            method:"GET",
            headers:{
                "x-auth-token" : token
            }
         });
         const data = await res.json()
            if(!data.data) {
            setError(data.message)
            
         }
         setUserData(data.data)
         console.log(userData)
        }
        fetchUserData()
    }, [])


    return (
        <Base>
        <div>
        <Button
    edge="end" 
    color="inherit" 
    aria-label="add students" 
    onClick={()=>navigate("/add")}
    sx={{ mr: 2 }}>  
     Add Notes
    </Button>
        </div>

        {userData && (
             <div>
                {userData?.map((data, index)=>(
                   <Paper 
                   elevation={6}
                   key={data._id}
                   >
                     <p>company name : {data.companyName}</p>
                     <p>date : {data.date}</p>
                     <p>location : {data.location}</p>
                     <p>poistion : {data.poistion}</p>
                     <p>questions : {data.questions}</p>
                     <p>package : {data.package}</p>
                     <p>skills : {data.skills}</p>
                     <p>posted by: {data.user.name}</p>
                     <Button>Edit</Button>
                     <Button>Delete</Button>
                   </Paper>
                ))}
             </div>
        )}


        </Base>
    )
}

export default UserPage