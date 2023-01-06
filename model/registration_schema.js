const mongoose = require('mongoose');
const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default:""
    },
   
    email: {
        type: String,
        required: true,
        unique: true
        ,default:""

    },
   

    confirmpassword: {
        type: String,
        required: true
        ,default:""


    }


})
Registration = new mongoose.model('Registration',regSchema);
module.exports = Registration;