import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext.js"
import PostForm from "./PostForm.js"
import PostList from "./PostList.js"
function YourPosts() {
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
        <h1 style={{marginTop: "30px"}}>Welcome {username}!</h1>
        <br />
        <h3>Your posts</h3>
        <br />
            <PostList posts={posts}/>
            <h3 style={{marginTop: 50}}>Add a New Post</h3>
            <PostForm addPost={addPost} />
        </>
    )
}


export default YourPosts