import mongoose from "mongoose";

// create a contact schema
const constactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required:true
  },
  lastname: {
    type: String,
    required:true
  },
  email: {
    type: String,
     required:true
  },
  message: {
    type: String,
     required:true
  },
  phoneNo: {
    type: String,
     required:true
  },
  countrycode: {
    type: String,
     required:true
  },
});



export default  mongoose.model("ContactUs", constactSchema);