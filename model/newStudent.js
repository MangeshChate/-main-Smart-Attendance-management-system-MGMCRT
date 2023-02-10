const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  sname: {
    type: String,
    required: true,
    default:""
  },

  semail: {
    type: String,
    required: true,
    unique: true,
    default:""
  },

  sid: {
    type: String,
    required: true,
    default:""
  },
  sroll: {
    type: String,
    required: true,
    default:""
  },
  syear: {
    type: String,
    required: true,
    default:""
  },
  sbranch: {
    type: String,
    required: true,
    default:""
  },
  spresent: {
    type: Number,
    default: 0,
  },
  stoday: {
    type: Number,
    default: 0,
  },
  simg: {
    data: Buffer,
    contentType: String,
    default:""
  },
  smac:{
    type:String,
    required:true,
    unique:true,
    default:""
  }

  // seq: { type: Number, default: 0 }
});
Student = new mongoose.model("Student", studentSchema);
module.exports = Student;
