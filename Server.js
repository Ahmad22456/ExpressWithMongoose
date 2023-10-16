const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const userSchema = require('./models/User')
require('dotenv').config()

const app = express()


// Connecting to Server
const server = http.createServer(app).listen(3000)
console.log('Server Connected')


// Connecting to Database
// mongoose.connect(`${process.env.MONGO_URL}/Users`).then(() => console.log('Database Connected')).catch((e) => console.error(e.message))
mongoose.connect('mongodb://127.0.0.1:27017/Users').then(() => console.log('Database Connected')).catch((e) => console.error(e.message))


// Parsing request body
app.use(express.json())


// Reading all users in the database
app.get('/', async function(req, res, next) {
    res.send(await userSchema.find())
})


// Creating a new user and adding it to database
app.post('/', async function(req, res, next) {
    const {name, age} = req.body
    const user = await userSchema.create({name, age})
    res.send(`User created: ${user}`)
})


// updating a user in the database
app.put('/', async function(req, res, next) {
    const {name, age} = req.body
    const user = await userSchema.findByIdAndUpdate({_id: '652333bcfb605db1a5d8b518'}, {$set: {name, age}}, {new: true})
    res.send(`User updated: ${user}`)
})


// deleting a user from the database
app.delete('/', async function(req, res, next) {
    const {_id} = req.body
    const user = await userSchema.findOneAndDelete({_id})
    res.send(`User deleted: ${user}`)
})