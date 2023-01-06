const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    name:{
        type:String
        ,default:""

    },
    email:{
        type:String 
        ,default:""

    }
    ,message:{
        type:String
        ,default:""

    }
});

const Complain = new mongoose.model('Complain',complainSchema);

module.exports= Complain;