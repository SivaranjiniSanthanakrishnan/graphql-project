const mongoose=require('mongoose')
const Schema= mongoose.Schema;

const author= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('author',author)