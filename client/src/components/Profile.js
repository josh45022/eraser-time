import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext.js"
import PostForm from "./PostForm.js"
import PostList from "./PostList.js"
function Profile() {
    const {
        user: {
            username
        },
        getUserPosts,
        addPost,
        posts,
        logout
    } = useContext(UserContext)



    useEffect(getUserPosts, [])
    return (
        <>
        <h1 className="publicuser" style={{marginTop: "30px"}}>Ready to go {username}?</h1>
            <button className="authformbutton logout" onClick={logout}>
                <Link to="/">
                Log Out
                </Link>
            </button>
        </>
    )
}


export default Profile