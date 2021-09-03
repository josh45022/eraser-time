import React, {useState, useContext} from "react"
import {UserContext} from "../context/UserContext.js"
import PostEditForm from "./PostEditForm.js"
import axios from "axios"

function Post(props) {


    const [canEdit, toggleCanEdit] = useState(false)
   
    const {addPost, deletePost} = useContext(UserContext)
    const { title, caption, imgUrl, _id } = props


    return (
    // <div className="post">
    //   {
        !canEdit?
      <div className="post">
      <h1>{ title }</h1>
      <h3>{ caption }</h3>
      <img alt="" src={imgUrl} />
      <button onClick={()=>deletePost(_id)}>Delete Post</button>
      <button onClick={()=>toggleCanEdit(prevState => !prevState)}>Edit Post</button>
      </div>
      :
      <>
        <PostEditForm {...props} addPost={addPost} toggleCanEdit={toggleCanEdit}/>
        <button onClick={()=>deletePost(_id)}>Delete Post</button>
        <button onClick={()=>toggleCanEdit(prevState => !prevState)}>Cancel</button>
      </>
    //   }
    // </div>
    )
}

export default Post