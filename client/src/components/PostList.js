import React from 'react'
import Post from "./Post.js"
function PostList(props){
  const { posts } = props
  return (
    <div className="post-list">
      { posts.map(post => <Post {...post} key={post._id}/>) }
    </div>
  )
}

export default PostList