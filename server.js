const express = require('express')
const app = express()
const dotenv = require("dotenv").config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require("express-jwt")
const port = process.env.PORT || 7000;
const path = require("path")



app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/erasertimedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ['sha1', 'RS256', 'HS256']}))
app.use("/api/post", require("./routes/postRouter.js"))
app.use("/api/users", require("./routes/usersRouter.js"))
app.use("/api/comments", require("./routes/commentRouter.js"))

app.use(
    (err, req, res, next) => {
        console.log(err)
        if(err.name === "UnauthorizedError"){
            res.status(err.status)
        }
        return res.send({errMsg: err.message})
    
         
    }
)

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})


app.listen(port, ()=> {
    console.log('This server is running on Port 7000')
})
