const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require ("cookie-parser")

const app = express()
const PORT = 8080

const userRoute = require("./routes/user")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

mongoose.connect('mongodb://localhost:27017/blogify').then((e)=>{console.log("MongoDB Connected")})
// Set up view engines
app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))

app.get("/",(req,res)=>{
    res.render("home",{
        user: req.user,
    })
})

app.use("/user",userRoute)

app.listen(PORT,()=>{console.log(`Server Started at ${PORT }`)})