require("dotenv").config()

const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require ("cookie-parser")
const Blog = require("./models/blog")

const app = express()

// PORT on the right side is basically an environment(dynamic) variable given to us by the cloud service
const PORT = process.env.PORT||8080

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

// We also need to add an environment variable here
// To run on local machiene in the command line type "export MONGO_URL = mongodb://localhost:27017/blogify"
mongoose.connect(process.env.MONGO_URL).then((e)=>{console.log("MongoDB Connected")})

// Set up view engines
app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=>{console.log(`Server Started at ${PORT }`)})