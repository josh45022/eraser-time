const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    caption: {
        type: String
      },
    imgUrl: {
      type: String
    },
    likes: {
        type: Number,
      },
    dislikes: {
        type: Number,
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    likers: {
      type: Array
    },
    dislikers: {
      type: Array
    }
})

module.exports = mongoose.model("Post", postSchema)