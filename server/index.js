const express = require('express')
const graphQL = require('express-graphql')
const schema=require('./schema/model')
const mongoose = require('mongoose')

const cors = require('cors')

const app= express()




mongoose.connect('mongodb://localhost:27017/library')
.then(data=>{
    console.log('connected')
})

app.use(cors())

app.use('/graphql', graphQL({
    schema,
    graphiql:true
}))



app.listen(4000, ()=>{
    console.log('listening')
})