const mongoose = require('mongoose')

const EmailSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    
    createdAt: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Email',EmailSchema)