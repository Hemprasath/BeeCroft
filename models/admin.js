const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const adminSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
 

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
 

adminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
 
module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);