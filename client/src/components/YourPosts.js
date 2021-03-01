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
        <h1 className="publicuser" style={{marginTop: "30px"}}>Welcome {username}!</h1>
        <br />
        <div className="postformwrapper">
            <h3 style={{marginTop: 50}}>Add a New Post</h3>
            <PostForm addPost={addPost} />
        </div>
        <br /><br />
        <h1 className="publicuser">Your posts</h1>
            <PostList posts={posts}/>

        </>
    )
}


export default YourPosts