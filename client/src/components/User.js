import React, {useState, useEffect} from "react"
import PublicPost from "./PublicPost.js"
import axios from "axios"

function User(props) {
    const {username, _id} = props
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const getPosts = (data) => {
        setPosts(data)
        return setIsLoading(prev => !prev)
    }

    useEffect(() => {
        userAxios.get(`/api/post/user/${_id}`) //changedthis
        .then(res => getPosts(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    },
    []
    )

    posts.sort((a, b) => (a.likes < b.likes? 1: -1) )

    return (
        !isLoading?
        <div className="userCard">
            <h1 className="publicuser">{username}'s Posts</h1>
            {posts.map(post => <PublicPost {...post}/>)}
        </div>:
        null
    )
}

export default User