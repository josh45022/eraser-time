import React, {useState, useContext} from "react"
import {UserContext} from "../context/UserContext.js"

function PostEditForm(props) {
    const initInputs = {
        title: props.title || "",
        caption: props.caption || "",
        imgUrl: props.imgUrl || "",
      }
    const [inputs, setInputs] = useState(initInputs)
    const {editPost} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))

    }

    function handleSubmit(e){
        e.preventDefault()
        editPost(inputs, props._id)
        props.toggleCanEdit(prevState => !prevState)
    }


    const { title, caption, imgUrl } = inputs
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            placeholder="Title"/>
            <input 
            type="text" 
            name="caption" 
            value={caption} 
            onChange={handleChange} 
            placeholder="Caption"/>
            <input 
            type="text" 
            name="imgUrl" 
            value={imgUrl} 
            onChange={handleChange} 
            placeholder="Img Url"/>
            <button>Add Post</button>
        </form>
    )
}

export default PostEditForm