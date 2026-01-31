const express=require('express')
const app=express()
const port=3000
const db_connect=require('./Model/config')
const routesIndex=require('./router/index')

app.use(express.json())
app.use('/',routesIndex)

app.listen(port,()=>{
    console.log(`app listen port ${port} connect to server`)
})

