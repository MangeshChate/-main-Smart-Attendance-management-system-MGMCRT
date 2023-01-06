const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://mangesh:QYTLPQdNOFoTwxuz@cluster0.6hhshhc.mongodb.net/studentDB?retryWrites=true&w=majority").then(()=>{
    console.log("mongo connection successfully !");

}).catch((e)=>{
    console.log("Error in Conecction !"+e);
})