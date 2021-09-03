const express = require("express")
const commentRouter = express()
const Comment = require("../models/comment.js")

commentRouter.get("/:postId", (req, res, next) => {
    Comment.find(
        {postId: req.params.postId},
        (err, comments) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})

commentRouter.post("/", (req, res, next) => {
    req.body.userId = req.user._id
    req.body.username = req.user.username
    const newComment = new Comment(req.body)
    console.log(newComment)
    newComment.save(
        (err, comment) => {
            if(err) {
                res.status(500)
                next(err)
            }
            return res.status(201).send(comment)
        }


    )
})

commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, userId: req.user._id},
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send("Successfully deleted post")
        }
    )
})

module.exports = commentRouter