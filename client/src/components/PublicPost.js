import React, {useState, useEffect} from "react"
import Comment from "./Comment.js"
import axios from "axios"

function PublicPost(props) {
    const { title, caption, _id, imgUrl} = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
     const [votes, setVotes] = useState({likes: props.likes || 0, dislikes: props.dislikes || 0})
     const [voteErrMsg, setVoteErr] = useState("")
     const [commentToggle, setCommentToggle] = useState(false)
     const [comments, setComments] = useState([])
     const [postObj, setPostObj] = useState({comment: "", postId: _id})

    useEffect(
        ()=> {
        userAxios.get(`/api/comments/${_id}`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
        }
    , [])


         
    function likePost(postId) {
        userAxios.put(`api/post/likes/${postId}`)
            .then(res => setVotes(prevVotes => ({...prevVotes, likes: res.data.likes || prevVotes.likes})))
            .catch(err => setVoteErr(err.response.data.errMsg))
      }
  
    function dislikePost(postId) {
        userAxios.put(`api/post/dislikes/${postId}`)
          .then(res => setVotes(prevVotes => ({...prevVotes, dislikes: res.data.dislikes})))
          .catch(err => setVoteErr(err.response.data.errMsg))
    }

    function handleChange(e){
        const {name, value} = e.target
        setPostObj(prevPostObj => ({
            ...prevPostObj,
            [name]: value 
        }))

    }



    function addComment(e) {
        e.preventDefault()
        userAxios.post("api/comments/", postObj)
            .then(res => {
                setComments(prevComments => [...prevComments, res.data])
            })
            .catch(err => console.log(err))
        setPostObj(prevPostObj => ({
            ...prevPostObj,
            comment: ""
        }))
    }

    function deleteComment(commentId) {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(res => setComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
    }
  






    return (
        !commentToggle?
            <div className="post">
                    <h1>{ title }</h1>
                    <h3>{ caption }</h3>
                    <img alt="" src={imgUrl} />
                    <h3>likes: {votes.likes}</h3>
                    <h3>dislikes: {votes.dislikes}</h3>
                    <button onClick={()=>likePost(_id)}>Like</button>
                    <button onClick={()=>dislikePost(_id)}>Dislike</button>
                    <button onClick={()=>setCommentToggle(prevToggle => !prevToggle)}>View Comments</button>
                    <p style={{color:"red"}}>{voteErrMsg}</p> 
            </div>

            :

            <div className="post commenting">
                <form className="commentform" onSubmit={addComment}>
                    <input
                    type="text" 
                    name="comment" 
                    value={postObj.comment} 
                    onChange={handleChange} 
                    placeholder="Type Your Comment Here"/>
                    <button style={{marginTop: "0px", padding: "0px"}} className="authformbutton">Add Comment</button>
                </form>
                {comments.map(comment => <Comment {...comment} deleteComment={deleteComment}/>)}
                <br />
                <button onClick={()=>setCommentToggle(prevToggle => !prevToggle)}>Hide Comments</button>
            </div>
        
        
    )
}

export default PublicPost