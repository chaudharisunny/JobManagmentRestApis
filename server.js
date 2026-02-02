const express=require('express')
const app=express()
const port=3000
const dotenv=require('dotenv')
const routesIndex=require('./router/index')
const connectDB = require('./config/db')

connectDB()
dotenv.config()
app.use(express.json())
app.use('/',routesIndex)

app.listen(port,()=>{
    console.log(`app listen port ${port} connect to server`)
})

