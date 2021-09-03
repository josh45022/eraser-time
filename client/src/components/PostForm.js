import React, {useState} from "react"

function PostForm(props) {

    const initInputs = {
        title: "",
        caption: "",
        imgUrl: ""
      }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
    }
    function handleSubmit(e){
        e.preventDefault()
        props.addPost(inputs)
        setInputs(initInputs)
    }


    const { title, caption, imgUrl } = inputs
    
    return (
        <form className="postform authform" onSubmit={handleSubmit}>
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
            placeholder="Image Url"/>
            <button className="authformbutton">Add Post</button>
        </form>
    )
}

export default PostForm