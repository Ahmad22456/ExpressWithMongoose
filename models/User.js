const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    // favouriteFoods: [String]
})

module.exports = mongoose.model('Account', userSchema)