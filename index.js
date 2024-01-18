const express = require("express")
const cors = require("cors")
const { serverConnect } = require("./backend/db")
const { userRouter } = require("./backend/routes/user.route")
const { employeeRouter } = require("./backend/routes/employee.route")
const { verify } = require("./backend/middleware/authorization")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.json("Welcome to masai app")
})
app.use("/users",userRouter)
app.use(verify)
app.use("/employees",employeeRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await serverConnect
        console.log(`Connected to DB server is running fine`)

    }catch(error){
        console.error("Error starting server",error)
    }
})
