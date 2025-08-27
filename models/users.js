const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String,unique:true, required: true },
  email: { type: String,unique:true, required: true },
  role: { type: String, required: true },
  password:{type:String,required:true},
  firstLogin: { type: Boolean, default: true },
  createdBy:{type:String},
  createdAt: { type: Date, default: Date.now },
});
 
module.exports = mongoose.model('User', userSchema);
 