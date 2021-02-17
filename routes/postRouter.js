const express = require("express")
const mongoose = require("mongoose")
const postRouter = express()
const Post = require("../models/post.js")



postRouter.get("/", (req, res, next) => {
    Post.find(
        (err, posts) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
        }
    )
})

//Get posts by user id (profile page)
postRouter.get("/user", (req, res, next) => {
    Post.find(
        { user: req.user._id }, 
        (err, posts) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})


//Get posts by user id ( )
postRouter.get("/user/:userId", (req, res, next)=>{
    Post.find(
        {user: req.params.userId},
        (err, posts) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
        })
})
//Get post by Post id
postRouter.get("/:postId", (req, res, next)=> {
    Post.find(
        {_id: req.params.postId },
        (err, posts) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
        }
    )
})

//Like
postRouter.put("/likes/:postId", (req, res, next)=> {
        Post.findOneAndUpdate(
            {_id: req.params.postId },
            {$inc: {likes: 1} },
            {new: true},      
            (err, post) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }

                if(!post.likers.includes(req.user._id)) {
                    Post.findOneAndUpdate(
                        {_id: req.params.postId},
                        {$push: {likers: req.user._id}},
                        {new: true},
                        (err, post) => {
                            if(err) {
                                res.status(500)
                                return next(err)
                            }
                            console.log(post)
                            return res.status(200).send(post)
                        })



                    


                }
                else {
                    res.status(500)
                    Post.findOneAndUpdate(
                        {_id: req.params.postId},
                        {$inc: {likes: -1}},
                        {new: true},
                        (err, post) => {
                            if(err) {
                                res.status(500)
                                return next(err)
                            }
                            return 
                        }
                    )
                    return next(new Error("You already liked!"))
                }
                 
            }
        )

    

})

//Downvote
postRouter.put("/dislikes/:postId", (req, res, next)=> {
    Post.findOneAndUpdate(
        {_id: req.params.postId },
        {$inc: {dislikes: 1} },
        {new: true},      
        (err, post) => {
            if(err) {
                res.status(500)
                return next(err)
            }

            if(!post.dislikers.includes(req.user._id)) {
                Post.findOneAndUpdate(
                    {_id: req.params.postId},
                    {$push: {dislikers: req.user._id}},
                    {new: true},
                    (err, post) => {
                        if(err) {
                            res.status(500)
                            return next(err)
                        }
                        console.log(post)
                        return res.status(200).send(post)
                    })



                


            }
            else {
                res.status(500)
                Post.findOneAndUpdate(
                    {_id: req.params.postId},
                    {$inc: {dislikes: -1}},
                    {new: true},
                    (err, post) => {
                        if(err) {
                            res.status(500)
                            return next(err)
                        }
                        return 
                    }
                )
                return next(new Error("You already disliked!"))
            }
             
        }
    )
})


//Add new post
postRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newPost = new Post(req.body)
    newPost.save(
        (err, savedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedPost)
        }
    )


})

//Delete Post
postRouter.delete("/:postId", (req, res, next) => {
    Post.findOneAndDelete(
        {_id: req.params.postId, user: req.user._id},
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted post")
        }
    )
})



//Update Posts
postRouter.put("/:postId", (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId, user: req.user._id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedPost)
        }
    )
})










module.exports = postRouter