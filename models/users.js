import db from './db';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.pre('save', function (next) {
  let User = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(User.password, salt, function(err, hash) {
        // Store hash in your password DB.
        User.password = hash;
        next();
    });
  });
})

userSchema.methods.comparePassword =  function(password, callback) {
  console.log('password');
  console.log(this.password);
  console.log(callback);
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if(err) { return callback(err);}
    callback(null, isMatch);
  });
}

let User = mongoose.model('User', userSchema);

export default User;
