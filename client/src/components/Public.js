import React, {useState, useEffect} from "react"
import User from "./User.js"
const axios = require("axios")

function Public() {
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getData = (data) => {
        setUsers(data)
        return setIsLoading(prev => !prev)
    }


    
    useEffect(()=>{userAxios.get("/api/users")
        .then(res => getData(res.data))
        .catch(err => console.log(err.response.data.errMsg))
        },
        []
    )


    
    return (
        <div className="publicPostsHolder">
            {isLoading?<h1 style={{fontWeight: 400}}>loading...</h1>:users.map(user => <User {...user}/>)}
        </div>
    )

}

export default Public