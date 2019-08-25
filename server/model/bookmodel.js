const mongoose=require('mongoose')
const Schema= mongoose.Schema;

const book= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    genre:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('books',book)